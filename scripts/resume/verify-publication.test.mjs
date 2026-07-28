import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const verifierScript = fileURLToPath(new URL("./verify-publication.mjs", import.meta.url));
const expectedPdfPaths = [
  "resume/build/silvia-arellano-senior-data-engineer.pdf",
  "public/silvia-arellano-cv.pdf",
  "dist/silvia-arellano-cv.pdf",
];

function exec(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { encoding: "utf8", ...options }, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve(`${stdout}${stderr}`);
    });
  });
}

async function makePublicationRoot(t) {
  const rootDir = await mkdtemp(join(tmpdir(), "resume-publication-"));
  t.after(() => rm(rootDir, { recursive: true, force: true }));

  for (const path of expectedPdfPaths) {
    const absolutePath = join(rootDir, path);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, "validated-senior-pdf");
  }
  await exec("git", ["init", "--quiet"], { cwd: rootDir });
  return rootDir;
}

async function runVerifier(rootDir) {
  return exec(process.execPath, [verifierScript], { cwd: rootDir });
}

test("accepts the exact Senior-only publication inventory with byte-identical PDFs", async (t) => {
  const rootDir = await makePublicationRoot(t);
  await assert.doesNotReject(runVerifier(rootDir));
});

test("rejects unexpected PDFs in public or dist", async (t) => {
  for (const directory of ["public", "dist"]) {
    const rootDir = await makePublicationRoot(t);
    await writeFile(join(rootDir, directory, "private-variant.pdf"), "private");

    await assert.rejects(
      runVerifier(rootDir),
      (error) => new RegExp(`exact ${directory} PDF inventory`).test(error.stderr),
      directory,
    );
  }
});

test("rejects a published PDF that differs from the validated Senior build", async (t) => {
  const rootDir = await makePublicationRoot(t);
  await writeFile(join(rootDir, "dist/silvia-arellano-cv.pdf"), "stale-or-replaced");

  await assert.rejects(
    runVerifier(rootDir),
    (error) => /byte-identical/.test(error.stderr),
  );
});

test("rejects tracked private specification or application paths", async (t) => {
  for (const privatePath of [
    "docs/superpowers/specs/private-plan.md",
    "resume/applications/acme/resume.tex",
  ]) {
    const rootDir = await makePublicationRoot(t);
    const absolutePath = join(rootDir, privatePath);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, "private");
    await exec("git", ["add", "-f", privatePath], { cwd: rootDir });

    await assert.rejects(
      runVerifier(rootDir),
      (error) => /tracked private path/.test(error.stderr),
      privatePath,
    );
  }
});
