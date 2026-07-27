import { execFile } from "node:child_process";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
} from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_RESUME_PATH, RESUME_VARIANTS } from "./config.mjs";
import { assertRequiredTools, validateResumePdf } from "./validate-resume.mjs";

function runCommand(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    execFile(command, args, { encoding: "utf8", ...options }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolvePromise(`${stdout}${stderr}`);
    });
  });
}

function sourceOutputName(source) {
  return basename(source, ".tex");
}

async function compileWithTectonic({ rootDir, variant, stagedPdf, stagingDir, run }) {
  const resumeDir = join(rootDir, "resume");
  const sourceName = sourceOutputName(variant.source);

  await run(
    "tectonic",
    ["--keep-logs", "--outdir", stagingDir, variant.source],
    { cwd: resumeDir },
  );

  await rename(join(stagingDir, `${sourceName}.pdf`), stagedPdf);
  return { logText: await readFile(join(stagingDir, `${sourceName}.log`), "utf8") };
}

export async function buildAllResumes({
  rootDir = process.cwd(),
  run = runCommand,
  assertTools = assertRequiredTools,
  compileVariant,
  copyPublicPdf = copyFile,
  validateVariant = validateResumePdf,
} = {}) {
  const buildDir = join(rootDir, "resume", "build");
  const publicPdf = join(rootDir, PUBLIC_RESUME_PATH);
  const compile = compileVariant ?? ((options) => compileWithTectonic({ ...options, run }));

  await assertTools((command, args) => run(
    command,
    args,
    { cwd: rootDir },
  ));
  await mkdir(buildDir, { recursive: true });

  let stagingRoot;
  try {
    stagingRoot = await mkdtemp(join(buildDir, ".staging-"));
    const stagedVariants = [];

    for (const variant of RESUME_VARIANTS) {
      const stagingDir = join(stagingRoot, variant.id);
      const stagedPdf = join(stagingDir, basename(variant.output));
      await mkdir(stagingDir, { recursive: true });

      const { logText } = await compile({
        rootDir,
        variant,
        stagedPdf,
        stagingDir,
      });
      await validateVariant({ variant, pdfPath: stagedPdf, logText });
      stagedVariants.push({ variant, stagedPdf });
    }

    for (const { variant, stagedPdf } of stagedVariants) {
      await rename(stagedPdf, join(rootDir, variant.output));
    }

    const seniorVariant = stagedVariants.find(({ variant }) => variant.publish);
    if (!seniorVariant) {
      throw new Error("No resume variant is configured for public publication");
    }

    await mkdir(dirname(publicPdf), { recursive: true });
    let temporaryPublicPdf;
    try {
      temporaryPublicPdf = join(
        dirname(publicPdf),
        `.${basename(publicPdf)}.staging-${process.pid}-${Date.now()}`,
      );
      await copyPublicPdf(join(rootDir, seniorVariant.variant.output), temporaryPublicPdf);
      await rename(temporaryPublicPdf, publicPdf);
    } finally {
      if (temporaryPublicPdf) {
        await rm(temporaryPublicPdf, { force: true });
      }
    }
  } finally {
    if (stagingRoot) {
      await rm(stagingRoot, { recursive: true, force: true });
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildAllResumes().catch((error) => {
    console.error(`Resume build failed: ${error.message}`);
    process.exitCode = 1;
  });
}
