
export function mod(x: number, n: number): number {
  return ((x % n) + n) % n;;
}

export function clamp(x: number, min: number, max: number): number {
  if (x < min) {
    x = min;
  }
  if (x > max) {
    x = max;
  }
  return x;
}

export function assertNever(_value: never): never {
  throw new Error(`Code that should have been unreachable was executed.`);
}
