import inputs from "./inputs";

const test = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const patterns = inputs.thirteen
  .trim()
  .split("\n\n")
  .map((patrn) => patrn.split("\n"));

const scoreVertical = (rows: string[]) => {
  // Creatre columns
  const len = rows[0].length;
  const cols = Array(len).fill("");
  rows.forEach((row) => {
    for (let c = 0; c < len; c++) {
      cols[c] += row.charAt(c);
    }
  });

  // each line of sym
  let score = 0;
  for (let line = 1; line < len; line++) {
    let sym = true;
    for (let i = 0; i < len; i++) {
      // check all pairs
      const l = line - 1 - i;
      const r = line + i;
      //   console.log([l, r]);
      if (l < 0 || r >= len) break;
      if (cols[l] !== cols[r]) {
        sym = false;
        break;
      }
    }
    // console.log({ line, sym });
    if (sym) score += line;
  }
  return score;
};

const scoreHoriz = (rows: string[]) => {
  let score = 0;
  for (let line = 1; line < rows.length; line++) {
    let sym = true;
    for (let c = 0; c < rows.length; c++) {
      const l = line - 1 - c;
      const r = line + c;
      if (l < 0 || r >= rows.length) break;
      if (rows[l] !== rows[r]) {
        sym = false;
        break;
      }
    }
    if (sym) score += 100 * line;
    // console.log({ line, sym });
  }
  return score;
};
// console.log(patterns);

const scores = patterns.map((pattern) => {
  const v = scoreVertical(pattern);
  const h = scoreHoriz(pattern);
  // console.log({ v, h });
  return v + h;
});

const sum = scores.reduce((t, x) => t + x, 0);
console.log(scores, { sum });
