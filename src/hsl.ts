import type { RGB } from "./rgb";
import type { HSV } from "./hsv";
import { EPSILON, colorTag } from "./common";
import { mod } from "./util";

export type HSL = [h: number, s: number, l: number, a?: number] & { [colorTag]: 'hsl' };

export function create(h: number, s: number, l: number, a?: number): HSL {
  return [ h, s, l, a ] as HSL;
}

export function strictEqual(a: HSL, b: HSL): boolean {
  const [h1, s1, l1] = a;
  const [h2, s2, l2] = b;
  return h1 === h2 && s1 === s2 && l1 === l2;
}

export function equal(a: HSL, b: HSL): boolean {
  const [h1, s1, l1] = a;
  const [h2, s2, l2] = b;
  return Math.abs(h2 - h1) < EPSILON
      && Math.abs(s2 - s1) < EPSILON
      && Math.abs(l2 - l1) < EPSILON;
}

export function fromRGB(rgb: RGB): HSL | undefined {
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
  const l = 0.5 * (M + m);
  const s = d / (1 - Math.abs(2 * l - 1));
  return create(h, s, l, a);
}

export function fromHSB(hsb: HSV): HSL {
  const [h, s, b] = hsb;
  const l = 0.5 * b * (2 - s);
  const s2 = (b * s) / (1 - Math.abs(2 * l - 1));
  return create( h, s2, l );
}

export function toCSS(color: HSL): string {
  const [ h, s, l, a ] = color;
  return a !== undefined
    ? `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`
    : `hsl(${h}, ${s * 100}%, ${l * 100}%)`
}

