
import { expect, test } from "bun:test"

import testData from "./test-data.json"

import { RGB, HSL, HSV } from "."

test('RGB to HSL', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, l] = color.hsl;
    const rgb = RGB.create(r, g, b);
    const expected = HSL.create(h, s, l);
    const actual = HSL.fromRGB(rgb);
    expect(actual).not.toBeUndefined();
    expect(HSL.equal(actual!, expected)).toBeTruthy();
  }
});

test('HSV to HSL', () => {
  for (const color of testData) {
    const [h1,s1,v1] = color.hsv;
    const [h2, s2, l2] = color.hsl;
    const hsv = HSV.create(h1, s1, v1);
    const expected = HSL.create(h2, s2, l2);
    const actual = HSL.fromHSV(hsv);
    expect(actual).not.toBeUndefined();
    expect(HSL.equal(actual!, expected)).toBeTruthy();
  }
});

