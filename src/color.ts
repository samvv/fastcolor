import { assertNever } from "./util";

import * as HSL from "./hsl"
import * as HSV from "./hsv"
import * as RGB from "./rgb"

export type Color = HSLColor | RGBColor | HSVColor;

const enum ColorType {
  RGB,
  HSL,
  HSV,
}

export type HSVColor = [ColorType.HSV, HSV.HSV];

export type HSLColor = [ColorType.HSL, HSL.HSL];

function assertHSL(color: Color): asserts color is HSLColor {
  if (!Array.isArray(color) || color[0] !== ColorType.HSL) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function isHSL(color: Color): color is HSLColor {
  return color[0] === ColorType.HSL;
}

export function createHSL(h: number, s: number, l: number): Color {
  return [ColorType.HSL, HSL.create(h, s, l)];
}

export function toHSL(color: Color): HSL.HSL | undefined {
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

export type RGBColor = [ColorType.RGB, RGB.RGB];

function assertRGB(color: Color): asserts color is RGBColor {
  if (!Array.isArray(color) || color[0] !== ColorType.RGB) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function isRGB(color: Color): color is RGBColor {
  return color[0] === ColorType.RGB;
}

export function createRGB(r: number, g: number, b: number): Color {
  return [ ColorType.RGB, RGB.create(r, g, b) ]
}

export function toRGB(color: Color): RGB.RGB {
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

