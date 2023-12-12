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

const img = test.trim().split("\n");

const expandSpace = (rows: string[]) => {
  const emptyRows = [];
  const colHasGalaxy: boolean[] = Array(rows[0].length).fill(false);

  // find Empty
  for (let r = 0; r < rows.length; r++) {
    if (!rows[r].includes("#")) emptyRows.push(r);
  }
  for (let c = 0; c < rows[0].length; c++) {
    for (let r = 0; r < rows.length; r++) {
      if (rows[r].charAt(c) === "#") colHasGalaxy[c] = true;
    }
  }

  console.log({
    emptyCol: colHasGalaxy.filter((x) => x === false).length,
    emptyRow: emptyRows.length,
  });

  // Expand Row
  let expanded = [...rows];
  for (let r = emptyRows.length - 1; r >= 0; r--) {
    const d = emptyRows[r];
    const double = expanded[d];
    expanded = [...expanded.slice(0, d), double, ...expanded.slice(d)];
  }
  // expand Cols
  expanded = expanded.map((row) =>
    row
      .split("")
      .map((ch, c) => (colHasGalaxy[c] ? ch : ch + ch))
      .join("")
  );
  return expanded;
};

const findHash = (rows: string[]) => {
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

const expanded = expandSpace(img);
// console.log(expanded.join("\n"));

const hashes = findHash(expanded);
console.log("hashes", hashes.length);

type GX = {
  r: number;
  i: number;
};
const calcDist = (gxa: GX, gxb: GX) => {
  const dist = Math.abs(gxa.r - gxb.r) + Math.abs(gxa.i - gxb.i);
  return dist;
};

const pairs = [];
for (let a = 0; a < hashes.length; a++) {
  for (let b = a + 1; b < hashes.length; b++) {
    pairs.push([a, b]);
  }
}

console.log(" pairs ", pairs.length);

const distances = pairs.map(([a, b]) => {
  const gxa = hashes[a];
  const gxb = hashes[b];
  const dist = calcDist(gxa, gxb);
  //   console.log([a, b], gxa, gxb, { dist });
  //   console.log(a, b);
  return dist;
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
