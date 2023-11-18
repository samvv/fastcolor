
import { expect, test } from "bun:test"
import { createHSL, createHSV, createRGB, isHSL, isHSV, isRGB } from "./color";

test('can create a Color from RGB', () => {
  const c1 = createRGB(0.2, 0.45, 0.11);
  expect(isRGB(c1)).toBeTrue();
});

test('can create a Color from HSL', () => {
  const c1 = createHSL(240, 0.45, 0.11);
  expect(isHSL(c1)).toBeTrue();
});

test('can create a Color from HSV', () => {
  const c1 = createHSV(128, 0.45, 0.11);
  expect(isHSV(c1)).toBeTrue();
});
