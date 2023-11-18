
import { expect, test } from "bun:test"

import testData from "./test-data.json"

import { RGB, HSL, HSV } from "."

test('HSL to RGB', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, l] = color.hsl;
    const hsl = HSL.create(h, s, l);
    const expected = RGB.create(r, g, b);
    const actual = RGB.fromHSL(hsl);
    expect(actual).not.toBeUndefined();
    expect(RGB.equal(actual!, expected)).toBeTruthy();
  }
});

test('HSV to RGB', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, v] = color.hsv;
    const hsv = HSV.create(h, s, v);
    const expected = RGB.create(r, g, b);
    const actual = RGB.fromHSV(hsv);
    expect(actual).not.toBeUndefined();
    expect(RGB.equal(actual!, expected)).toBeTrue();
  }
});

