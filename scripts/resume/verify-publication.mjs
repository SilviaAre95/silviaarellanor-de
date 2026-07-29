import { execFile } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_PUBLIC_PDFS = ["public/silvia-arellano-cv.pdf"];
const EXPECTED_DIST_PDFS = ["dist/silvia-arellano-cv.pdf"];
const SENIOR_BUILD_PDF = "resume/build/silvia-arellano-senior-data-engineer.pdf";
const PRIVATE_PATH_PREFIXES = [
  "docs/superpowers/specs/",
  "resume/applications/",
];

function run(command, args, options = {}) {
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

async function listPdfPaths(rootDir, relativeDirectory) {
  const directory = join(rootDir, relativeDirectory);
  const paths = [];

  async function walk(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
      } else if (entry.name.toLowerCase().endsWith(".pdf")) {
        paths.push(relative(rootDir, absolutePath));
      }
    }
  }

  await walk(directory);
  return paths.sort();
}

function assertExactInventory(label, actualPaths, expectedPaths) {
  if (
    actualPaths.length !== expectedPaths.length
    || actualPaths.some((path, index) => path !== expectedPaths[index])
  ) {
    throw new Error(
      `Expected exact ${label} PDF inventory ${expectedPaths.join(", ")}; found ${actualPaths.join(", ") || "none"}`,
    );
  }
}

export async function verifyPublication({
  rootDir = process.cwd(),
  listTracked,
} = {}) {
  const canonicalRoot = resolve(rootDir);
  const publicPdfs = await listPdfPaths(canonicalRoot, "public");
  const distPdfs = await listPdfPaths(canonicalRoot, "dist");
  assertExactInventory("public", publicPdfs, EXPECTED_PUBLIC_PDFS);
  assertExactInventory("dist", distPdfs, EXPECTED_DIST_PDFS);

  const [buildPdf, publicPdf, distPdf] = await Promise.all([
    readFile(join(canonicalRoot, SENIOR_BUILD_PDF)),
    readFile(join(canonicalRoot, EXPECTED_PUBLIC_PDFS[0])),
    readFile(join(canonicalRoot, EXPECTED_DIST_PDFS[0])),
  ]);
  if (!buildPdf.equals(publicPdf) || !publicPdf.equals(distPdf)) {
    throw new Error("Senior build, public, and dist PDFs must be byte-identical");
  }

  const trackedOutput = listTracked
    ? await listTracked()
    : await run("git", ["ls-files", "-z"], { cwd: canonicalRoot });
  const trackedPaths = trackedOutput
    .split("\0")
    .filter(Boolean);
  const trackedPrivatePath = trackedPaths.find((path) => (
    PRIVATE_PATH_PREFIXES.some((prefix) => (
      path === prefix.slice(0, -1) || path.startsWith(prefix)
    ))
  ));
  if (trackedPrivatePath) {
    throw new Error(`Repository contains tracked private path: ${trackedPrivatePath}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  verifyPublication()
    .then(() => {
      console.log("Resume publication verification passed");
    })
    .catch((error) => {
      console.error(`Publication verification failed: ${error.message}`);
      process.exitCode = 1;
    });
}
