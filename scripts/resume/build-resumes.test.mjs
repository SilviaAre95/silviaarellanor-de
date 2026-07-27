import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import test from "node:test";
import { PUBLIC_RESUME_PATH, RESUME_VARIANTS } from "./config.mjs";
import { buildAllResumes } from "./build-resumes.mjs";

async function makeRootDir() {
  const rootDir = await mkdtemp(join(tmpdir(), "resume-build-"));
  const publicPdf = join(rootDir, PUBLIC_RESUME_PATH);
  await mkdir(join(rootDir, "public"));
  await writeFile(publicPdf, "previous-public-pdf");
  return { rootDir, publicPdf };
}

function successfulCompiler() {
  return async ({ variant, stagedPdf }) => {
    await writeFile(stagedPdf, `compiled-${variant.id}`);
    return { logText: "" };
  };
}

async function expectPublicationManifestFailure(rootDir, variants, expectedMessage) {
  await assert.rejects(
    buildAllResumes({
      rootDir,
      variants,
      assertTools: async () => {
        throw new Error("tool checks must not run for an invalid publication manifest");
      },
      compileVariant: async () => {
        throw new Error("compilation must not run for an invalid publication manifest");
      },
    }),
    expectedMessage,
  );
}

test("rejects a manifest that publishes more than one resume before compilation", async () => {
  const { rootDir } = await makeRootDir();
  const variants = RESUME_VARIANTS.map((variant) => ({
    ...variant,
    publish: variant.id !== "data-leadership",
  }));

  await expectPublicationManifestFailure(
    rootDir,
    variants,
    /exactly one public resume variant/,
  );
});

test("rejects a manifest that publishes a non-Senior variant before compilation", async () => {
  const { rootDir } = await makeRootDir();
  const variants = RESUME_VARIANTS.map((variant) => ({
    ...variant,
    publish: variant.id === "forward-deployed-engineer",
  }));

  await expectPublicationManifestFailure(
    rootDir,
    variants,
    /must be senior-data-engineer/,
  );
});

test("preserves the previous public PDF when a later variant fails", async () => {
  const { rootDir, publicPdf } = await makeRootDir();

  await assert.rejects(
    buildAllResumes({
      rootDir,
      assertTools: async () => {},
      compileVariant: async ({ variant, stagedPdf }) => {
        if (variant.id === "forward-deployed-engineer") {
          throw new Error("synthetic compile failure");
        }

        await writeFile(stagedPdf, variant.id);
        return { logText: "" };
      },
      validateVariant: async () => {},
    }),
    /synthetic compile failure/,
  );

  assert.equal(await readFile(publicPdf, "utf8"), "previous-public-pdf");
});

test("publishes a byte-for-byte Senior PDF only after every variant validates", async () => {
  const { rootDir, publicPdf } = await makeRootDir();

  await buildAllResumes({
    rootDir,
    assertTools: async () => {},
    compileVariant: successfulCompiler(),
    validateVariant: async () => {},
  });

  const seniorVariant = RESUME_VARIANTS.find(({ publish }) => publish);
  assert.ok(seniorVariant);
  const seniorPdf = join(rootDir, seniorVariant.output);
  assert.deepEqual(await readFile(publicPdf), await readFile(seniorPdf));
});

test("removes the temporary public PDF when publication copy fails", async () => {
  const { rootDir, publicPdf } = await makeRootDir();

  await assert.rejects(
    buildAllResumes({
      rootDir,
      assertTools: async () => {},
      compileVariant: successfulCompiler(),
      validateVariant: async () => {},
      copyPublicPdf: async (_source, destination) => {
        await writeFile(destination, "partial-public-pdf");
        throw new Error("synthetic publication copy failure");
      },
    }),
    /synthetic publication copy failure/,
  );

  assert.equal(await readFile(publicPdf, "utf8"), "previous-public-pdf");
  assert.deepEqual(await readdir(join(rootDir, "public")), ["silvia-arellano-cv.pdf"]);
});

test("invokes the Tectonic compiler from PATH for every staged variant", async () => {
  const { rootDir } = await makeRootDir();
  const compilerCommands = [];

  await buildAllResumes({
    rootDir,
    run: async (command, args, options = {}) => {
      if (command !== "tectonic") return "available";
      if (args[0] === "--version") return "Tectonic 0.16.9";

      compilerCommands.push({ command, args, cwd: options.cwd });
      const outputDirectory = args[args.indexOf("--outdir") + 1];
      const sourceName = basename(args.at(-1), ".tex");
      await writeFile(join(outputDirectory, `${sourceName}.pdf`), sourceName);
      await writeFile(join(outputDirectory, `${sourceName}.log`), "");
      return "";
    },
    validateVariant: async () => {},
  });

  assert.equal(compilerCommands.length, RESUME_VARIANTS.length);
  for (const { command, args, cwd } of compilerCommands) {
    assert.equal(command, "tectonic");
    assert.ok(args.includes("--keep-logs"));
    assert.equal(cwd, join(rootDir, "resume"));
  }
});

test("keeps Forward Deployed Engineer and Data Leadership PDFs out of public", async () => {
  const { rootDir } = await makeRootDir();

  await buildAllResumes({
    rootDir,
    assertTools: async () => {},
    compileVariant: successfulCompiler(),
    validateVariant: async () => {},
  });

  for (const variant of RESUME_VARIANTS.filter(({ publish }) => !publish)) {
    await assert.rejects(access(join(rootDir, "public", `${variant.id}.pdf`)));
    assert.equal(
      await readFile(join(rootDir, variant.output), "utf8"),
      `compiled-${variant.id}`,
    );
  }

  assert.deepEqual(await readdir(join(rootDir, "public")), ["silvia-arellano-cv.pdf"]);
});
