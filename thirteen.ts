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
  let smudgeLine = [0, 0];

  for (let line = 1; line < len; line++) {
    let unsym = 0;
    for (let i = 0; i < len; i++) {
      // comp all cols
      const l = line - 1 - i;
      const r = line + i;
      //   console.log([l, r]);
      if (l < 0 || r >= len) break;
      if (cols[l] !== cols[r]) {
        unsym++;
        smudgeLine = [l, r];
      }
    }
    // console.log({ line, lines, unsym });
    // if only 1 symmetric line
    if (unsym === 1) {
      //  potential smudge
      const diff = stringDiffs(cols[smudgeLine[0]], cols[smudgeLine[1]]);
      if (diff === 1) {
        // console.log({ line, unsym, smudgeLine });
        // console.log(rows[smudgeLine[0]], rows[smudgeLine[1]]);
        score = line;
        break;
      }
    }
  }
  return score;
};

const stringDiffs = (a: string, b: string) => {
  let diff = 0;
  for (let x = 0; x < a.length; x++) {
    if (a.charAt(x) !== b.charAt(x)) diff++;
  }
  return diff;
};

const scoreHoriz = (rows: string[]) => {
  let score = 0;
  // check each line of sym
  for (let line = 1; line < rows.length; line++) {
    let unsym = 0;
    let smudgeLine = [0, 0];
    // compare all rows
    for (let c = 0; c < rows.length; c++) {
      const l = line - 1 - c;
      const r = line + c;
      if (l < 0 || r >= rows.length) break;
      if (rows[l] !== rows[r]) {
        unsym++;
        smudgeLine = [l, r];
      }
    }
    // if only 1 unsymmetric line
    if (unsym === 1) {
      //  potential smudge
      const diff = stringDiffs(rows[smudgeLine[0]], rows[smudgeLine[1]]);
      if (diff === 1) {
        // console.log({ line, unsym, smudgeLine });
        // console.log(rows[smudgeLine[0]], rows[smudgeLine[1]]);
        score = 100 * line;
        break;
      }
    }
  }
  return score;
};
// console.log(patterns);

const scores = patterns.map((pattern) => {
  const v = scoreVertical(pattern);
  const h = scoreHoriz(pattern);
  // console.log({ v, h });
  if (v + h === 0) {
    console.log(" ERROR ", { v, h });
  }
  return v + h;
});

const sum = scores.reduce((t, x) => t + x, 0);
console.log(scores, { sum });
