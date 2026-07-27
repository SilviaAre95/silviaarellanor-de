import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Forward Deployed Engineer does not render an empty Worky consulting role", async () => {
  const source = await readFile(
    new URL("../../resume/variants/forward-deployed-engineer.tex", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /\\WorkyContractRole/);
});
