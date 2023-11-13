
import type { RGB } from "./rgb"
import type { HSL } from "./hsl"
import { EPSILON, colorTag } from "./common";
import { mod } from "./util"

export type HSV = [h: number, s: number, b: number, a?: number] & { [colorTag]: 'hsv' };

export function create(h: number, s: number, v: number, a?: number): HSV {
  return [ h, s, v, a ] as HSV;
}

export function strictEqual(a: HSV, b: HSV): boolean {
  const [h1, s1, v1] = a;
  const [h2, s2, v2] = b;
  return h1 === h2 && s1 === s2 && v1 === v2;
}

export function equal(a: HSV, b: HSV): boolean {
  const [h1, s1, v1] = a;
  const [h2, s2, v2] = b;
  return (Math.abs(h2 - h1) < EPSILON)
      && (Math.abs(s2 - s1) < EPSILON)
      && (Math.abs(v2 - v1) < EPSILON);
}

export function fromRGB(rgb: RGB): HSV | undefined {
  const [r,g,b,a] = rgb;
  const M = Math.max(r,g,b);
  const m = Math.min(r,g,b);
  const d = M - m;
  if (d === 0) {
    return;
  }
  let h!: number;
  switch (M) {
    case r:
      h = mod((60 * (g - b) / d), 360);
      break;
    case g:
      h = (60 * (b - r) / d) + 120;
      break;
    case b:
      h = (60 * (r - g) / d) + 240;
  }
  const s = d / M;
  return create(h, s, M, a);
}

export function fromHSL([h, s, l, a]: HSL): HSV {
  const b = (2 * l + s * (1 - Math.abs(2 * l - 1))) / 2
  const s2 = 2 * (b - l) / b;
  return create(h, s2, b, a);
}
