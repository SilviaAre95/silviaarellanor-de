import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("development generates the ignored public resume before Vite starts", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.predev, "npm run resume:build");
});
