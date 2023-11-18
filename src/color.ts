import { assertNever } from "./util";

import { HSL } from "./hsl"
import { HSV } from "./hsv"
import { RGB } from "./rgb"

export type Color = HSLColor | RGBColor | HSVColor;

const enum ColorType {
  RGB,
  HSL,
  HSV,
}

export type RGBColor = [ColorType.RGB, RGB];

export type HSVColor = [ColorType.HSV, HSV];

export type HSLColor = [ColorType.HSL, HSL];

function assertRGB(color: Color): asserts color is RGBColor {
  if (!Array.isArray(color) || color[0] !== ColorType.RGB) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

function assertHSL(color: Color): asserts color is HSLColor {
  if (!Array.isArray(color) || color[0] !== ColorType.HSL) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function isRGB(color: Color): color is RGBColor {
  return color[0] === ColorType.RGB;
}

export function isHSL(color: Color): color is HSLColor {
  return color[0] === ColorType.HSL;
}

export function isHSV(color: Color): color is HSVColor {
  return color[0] === ColorType.HSV;
}

export function createRGB(r: number, g: number, b: number): Color {
  return [ ColorType.RGB, RGB.create(r, g, b) ]
}

export function createHSL(h: number, s: number, l: number): Color {
  return [ColorType.HSL, HSL.create(h, s, l)];
}

export function createHSV(h: number, s: number, v: number): Color {
  return [ ColorType.HSV, HSV.create(h, s, v) ];
}

export function fromRGB(rgb: RGB): Color {
  return [ ColorType.RGB, rgb ]
}

export function fromHSL(hsl: HSL): Color {
  return [ColorType.HSL, hsl];
}

export function fromHSV(hsv: HSV): Color {
  return [ ColorType.HSV, hsv ];
}

export function toRGB(color: Color): RGB | undefined {
  switch (color[0]) {
    case ColorType.HSV:
      return RGB.fromHSV(color[1]);
    case ColorType.HSL:
      return RGB.fromHSL(color[1]);
    case ColorType.RGB:
      return color[1];
    default:
      assertNever(color);
  }
}

export function toHSL(color: Color): HSL | undefined {
  switch (color[0]) {
    case ColorType.HSL:
      return color[1];
    case ColorType.HSV:
      return HSL.fromHSB(color[1]);
    case ColorType.RGB:
      return HSL.fromRGB(color[1]);
    default:
      assertNever(color);
  }
}

export function toHSV(color: Color): HSV | undefined {
  switch (color[0]) {
    case ColorType.HSV:
      return color[1];
    case ColorType.HSL:
      return HSV.fromHSL(color[1]);
    case ColorType.RGB:
      return HSV.fromRGB(color[1]);
    default:
      assertNever(color);
  }
}

export function toCSS(color: Color): string | undefined {
  switch (color[0]) {
    case ColorType.RGB:
      return RGB.toCSS(color[1]);
    case ColorType.HSL:
      return HSL.toCSS(color[1]);
    case ColorType.HSV:
      return undefined;
    default:
      assertNever(color);
  }
}

