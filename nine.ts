import inputs from "./inputs";

// const ip = inputs.ninetest;
const ip = inputs.nine;

const iszerod = (ray: number[]) => ray.filter((x) => x !== 0).length === 0;

const calcMatrix = (nums: number[]) => {
  let x = 0;
  const matrix = [nums];
  while (!iszerod(matrix[x])) {
    const vals = matrix[x];
    const diff = vals
      .map((_, i) => (i === 0 ? 0 : vals[i] - vals[i - 1]))
      .slice(1);

    // console.log({ vals, diff, zero });
    matrix.push(diff);
    x++;
  }
  return matrix;
};

const solveMatrix = (matrix: number[][]) => {
  //   matrix[matrix.length - 1].push(0);
  // console.log({ matrix });

  for (let i = 1; i < matrix.length; i++) {
    const row = matrix[matrix.length - 1 - i + 0];
    const prevRow = matrix[matrix.length - 1 - i + 1];
    const last = row[row.length - 1];
    const diff = prevRow[prevRow.length - 1];
    const n = last + diff;
    // console.log({ i, row, last, diff, n });
    row.push(n);
  }
  const row = matrix[0];
  const final = row[row.length - 1];
  //   console.log({ solve: matrix, final });
  return final;
};

const solveTwo = (matrix: number[][]) => {
  matrix[matrix.length - 1] = [0, ...matrix[matrix.length - 1]];
  //   console.log({ matrix });

  let solution;
  for (let i = 1; i < matrix.length; i++) {
    const row = matrix[matrix.length - 1 - i + 0];
    const prevRow = matrix[matrix.length - 1 - i + 1];
    const first = row[0];
    const diff = prevRow[0];
    const n = first - diff;
    // console.log({ row, prevRow, first, diff, n });
    matrix[matrix.length - 1 - i + 0] = [
      n,
      ...matrix[matrix.length - 1 - i + 0],
    ];
    solution = n;
  }
  //   console.log({ matrix });
  return solution;
};

const res = ip
  .split("\n")
  //   .slice(0, 1)
  .map((row) => {
    const nums = row
      .trim()
      .split(" ")
      .map((x) => parseInt(x));

    const matrix = calcMatrix(nums);
    return solveTwo(matrix);
    // return solveMatrix(matrix);
  });

const sum = res.reduce((t, x) => t + x, 0);
console.log({ res, sum });
