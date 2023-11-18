
import { expect, test } from "bun:test"

import testData from "./test-data.json"

import { RGB, HSL, HSV } from "."

test('HSL to HSV', () => {
  for (const color of testData) {
    const [h1,s1,l1] = color.hsl;
    const [h, s, v] = color.hsv;
    const hsl = HSL.create(h1, s1, l1);
    const expected = HSV.create(h, s, v);
    const actual = HSV.fromHSL(hsl);
    expect(actual).not.toBeUndefined();
    expect(HSV.equal(actual!, expected)).toBeTruthy();
  }
});

test('RGB to HSV', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, v] = color.hsv;
    const rgb = RGB.create(r, g, b);
    const expected = HSV.create(h, s, v);
    const actual = HSV.fromRGB(rgb);
    expect(actual).not.toBeUndefined();
    expect(HSV.equal(actual!, expected)).toBeTruthy();
  }
});
