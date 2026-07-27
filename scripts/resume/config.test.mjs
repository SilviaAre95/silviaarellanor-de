import assert from "node:assert/strict";
import test from "node:test";
import {
  PUBLIC_RESUME_PATH,
  RESUME_VARIANTS,
  TECTONIC_VERSION,
} from "./config.mjs";

test("pins the approved compiler and declares three unique variants", () => {
  assert.equal(TECTONIC_VERSION, "0.16.9");
  assert.equal(RESUME_VARIANTS.length, 3);
  assert.equal(new Set(RESUME_VARIANTS.map(({ id }) => id)).size, 3);
});

test("publishes only the Senior Data Engineer variant", () => {
  const publicVariants = RESUME_VARIANTS.filter(({ publish }) => publish);
  assert.deepEqual(publicVariants.map(({ id }) => id), ["senior-data-engineer"]);
  assert.equal(PUBLIC_RESUME_PATH, "public/silvia-arellano-cv.pdf");
});

test("requires target-specific headlines and common identity markers", () => {
  for (const variant of RESUME_VARIANTS) {
    assert.ok(variant.headline.length > 10);
    assert.ok(variant.requiredText.includes("Silvia Arellano Romero"));
    assert.ok(variant.requiredText.includes("silvia.datadev@gmail.com"));
    assert.ok(variant.requiredText.includes("+52 987 117 4186"));
    assert.ok(variant.requiredText.includes("+34 603 990 662"));
  }
});
