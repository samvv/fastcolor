
import Color from "colorjs.io"

const numItems = 200;

let out = [];

for (let i = 0; i < numItems; i++) {
  const color = new Color('srgb', [ Math.random(), Math.random(), Math.random() ], Math.random());
  const [r, g, b ] = color.to('srgb').coords;
  const [h1, s1, l1] = color.to('hsl').coords;
  const [h2, s2, b2] = color.to('hsv').coords;
  out.push({
    rgb: [ r, g, b ],
    hsl: [ h1, s1, l1],
    hsv: [ h2, s2, b2],
  });
}

console.log(JSON.stringify(out, undefined, 2));
