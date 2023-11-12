import { assertNever, clamp } from "./util";

import { HSL } from "./hsl"
import { HSV } from "./hsv"
import { EPSILON } from "./common";

export type RGB = [r: number, g: number, b: number, a?: number];

export function create(r: number, g: number, b: number, a?: number): RGB {
  return [ r, g, b, a ];
}

export function strictEqual(a: RGB, b: RGB): boolean {
  const [r1, g1, b1] = a;
  const [r2, g2, b2] = b;
  return r1 === r2 && g1 === g2 && b1 === b2;
}

export function equal(a: RGB, b: RGB): boolean {
  const [r1, g1, b1] = a;
  const [r2, g2, b2] = b;
  return Math.abs(r2 - r1) < EPSILON
      && Math.abs(g2 - g1) < EPSILON
      && Math.abs(b2 - b1) < EPSILON;
}

export function setAlpha(color: RGB, a: number): RGB {
  const [r,g,b] = color;
  return [r,g,b,a];
}

export function fromNumber(x: number): RGB {
  let r = (x >> 16) & 0xFF;
  let g = (x >> 8) & 0xFF;
  let b = (x >> 0) & 0xFF;
  return [r, g, b];
}

export function fromHSL([h, s, l]: HSL): RGB {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * clamp(Math.min(k - 3, 9 - k), -1, 1);
  }
  const r = f(0);
  const g = f(8);
  const b = f(4);
  return [r, g, b];
}

export function fromHSV([h, s, v, a]: HSV): RGB {

  // const M = v;
  // const c = s * v;
  // const m = M - c;

  // const h2 = h >= 300
  //   ? (h - 360) / 60
  //   : h / 60;

  // let r!: number, g!: number, b!: number;
  // if (h2 >= -1 && h2 < 1) {
  //   if (h2 < 0) {
  //     r = M;
  //     g = m;
  //     b = g - h2 * c;
  //   } else {
  //     r = M;
  //     b = m;
  //     g = b + h2 * c;
  //   }
  // } else if (h2 >= 1 && h2 < 3) {
  //   if (h2 < 2) {
  //     g = M;
  //     b = m;
  //     r = b - (h2 - 2) * c;
  //   } else {
  //     g = M;
  //     r = m;
  //     b = r + (h2 - 2) * c;
  //   }
  // } else if (h2 >= 3 && h2 < 5) {
  //   if (h2 < 4) {
  //     b = M;
  //     r = m;
  //     g = r - (h2 - 4) * c;
  //   } else {
  //     b = M;
  //     g = m;
  //     r = g + (h2 - 4) * c;
  //   }
  // }

  const hh = h / 60.0;
  const i = Math.floor(hh);
  const ff = hh - i;
  const p = v * (1.0 - s);
  const q = v * (1.0 - (s * ff));
  const t = v * (1.0 - (s * (1.0 - ff)));

  let r: number, g: number, b: number;
  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      throw new Error(`Code that should have been unreachable was executed.`);
  }

  return [r,g,b,a];
}

export function toHex(color: RGB): string {
  const [r,g,b] = color;
  const rPart = r.toString(16).padStart(2, '0');
  const gPart = g.toString(16).padStart(2, '0');
  const bPart = b.toString(16).padStart(2, '0');
  return `#` + rPart + gPart + bPart;
}

export function toCSS(color: RGB): string {
  const [r,g,b,a] = color;
  return a !== undefined
    ? `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`
    : `rgb(${r * 255}, ${g * 255}, ${b * 255})`
}
