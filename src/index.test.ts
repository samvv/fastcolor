
import { expect, test } from "bun:test"

import testData from "./test-data.json"

import { RGB, HSL, HSV } from "."

test('convert from RGB to HSL and back', () => {
  const color1 = RGB.create(0.11, 0.5, 0.8);
  expect(RGB.equal(color1, RGB.fromHSL(HSL.fromRGB(color1)!))).toBeTrue();
  const color2 = RGB.create(0.91, 0.5, 0.1);
  expect(RGB.equal(color2, RGB.fromHSL(HSL.fromRGB(color2)!))).toBeTrue();
  const color3 = RGB.create(0.85, 0.7, 0.99);
  expect(RGB.equal(color3, RGB.fromHSL(HSL.fromRGB(color3)!))).toBeTrue();
  const color4 = RGB.create(0.11, 0.23, 0.16);
  expect(RGB.equal(color4, RGB.fromHSL(HSL.fromRGB(color4)!))).toBeTrue();
});
