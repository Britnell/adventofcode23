import inputs from "./inputs";

const test = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const img = inputs.eleven.trim().split("\n");

const findHashes = (rows: string[]) => {
  const hashes: GX[] = [];

  rows.forEach((row, r) => {
    const hshs = [...row.matchAll(/(#)/g)]
      .map((reg) => reg.index)
      .filter((x) => x !== undefined);
    // console.log({ row }, hshs);
    hshs.forEach((i) => i !== undefined && hashes.push({ r, i }));
  });
  return hashes;
};

// const expanded = [img];

const emptyRows = [];
const colHasGalaxy: boolean[] = Array(img[0].length).fill(false);

// find Empty
for (let r = 0; r < img.length; r++) {
  if (!img[r].includes("#")) emptyRows.push(r);
}
for (let c = 0; c < img[0].length; c++) {
  for (let r = 0; r < img.length; r++) {
    if (img[r].charAt(c) === "#") colHasGalaxy[c] = true;
  }
}
const emptyCols = colHasGalaxy.map((x) => !x);

const hashes = findHashes(img);
console.log({ emptyRows, emptyCols });

console.log("hashes", hashes.length);

type GX = {
  r: number;
  i: number;
};
const xmin = (a: number, b: number) => (a < b ? a : b);
const xmax = (a: number, b: number) => (a > b ? a : b);

const calcDist = (gxa: GX, gxb: GX) => {
  const dist = Math.abs(gxa.r - gxb.r) + Math.abs(gxa.i - gxb.i);

  let empties = 0;

  for (let r = xmin(gxa.r, gxb.r); r < xmax(gxa.r, gxb.r); r++) {
    if (emptyRows.includes(r)) empties++;
    // console.log(r, emptyRows.includes(r));
  }
  for (let i = xmin(gxa.i, gxb.i); i < xmax(gxa.i, gxb.i); i++) {
    // console.log(i, emptyCols[i]);
    if (emptyCols[i]) empties++;
  }
  return dist + empties * 999999;
};

const pairs = [];
for (let a = 0; a < hashes.length; a++) {
  for (let b = a + 1; b < hashes.length; b++) {
    pairs.push([a, b]);
  }
}

console.log(" pairs ", pairs.length);

// calcDist(hashes[0], hashes[1]);

const distances = pairs.map(([a, b]) => {
  const gxa = hashes[a];
  const gxb = hashes[b];
  //   console.log([a, b], gxa, gxb, { dist });
  //   console.log(a, b);
  return calcDist(gxa, gxb);
});

// console.log(distances);

const sum = distances.reduce((t, x) => t + x, 0);
console.log(sum);

/* 
0 1 2 3 4


0 1 
0 2 
0 3 
0 4
1 2 
1 3
1 4
2 3
2 4
3 4

*/
