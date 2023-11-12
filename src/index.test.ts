
import { expect, test } from "bun:test"

import testData from "./test-data.json"

import { RGB, HSL, HSV } from "."
import { watch } from "fs";

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

test('RGB to HSV', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, v] = color.hsv;
    const rgb = RGB.create(r, g, b);
    const expected = HSL.create(h, s, v);
    const actual = HSV.fromRGB(rgb);
    expect(actual).not.toBeUndefined();
    expect(HSV.equal(actual!, expected)).toBeTruthy();
  }
});

test('HSL to RGB', () => {
  for (const color of testData) {
    const [r,g,b] = color.rgb;
    const [h, s, l] = color.hsl;
    const hsl = HSL.create(h, s, l);
    const expected = RGB.create(r, g, b);
    const actual = RGB.fromHSL(hsl);
    expect(actual).not.toBeUndefined();
    expect(HSL.equal(actual!, expected)).toBeTruthy();
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
    expect(HSV.equal(actual!, expected)).toBeTrue();
  }
});

