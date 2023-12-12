const getMatrix = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const findStart = (mx: string[][]) => {
  let start: [number, number] = [0, 0];
  mx.forEach((row, r) =>
    row.forEach((letr, l) => {
      if (letr === "S") start = [r, l];
    })
  );
  return start;
};

const getCell = (matrix: string[][], p: [number, number]) => {
  const [x, y] = p;
  if (p.includes(-1)) return null;
  return matrix[y][x];
};

const connectTop = (mx: string[][], pos: [number, number]) => {
  const [x, y] = pos;
  const nb = [x, y - 1];
  const shape = getCell(mx, nb);
  if (shape === null) return null;
  const connects = "7|F".includes(shape);
  return connects ? nb : null;
};

const connectBot = (mx: string[][], pos: [number, number]) => {
  const [x, y] = pos;
  const nb = [x, y + 1];
  const shape = getCell(mx, nb);
  if (shape === null) return null;
  const connects = "J|L".includes(shape);
  return connects ? nb : null;
};

const connectLeft = (mx: string[][], pos: [number, number]) => {
  const [x, y] = pos;
  const nb = [x - 1, y];
  const shape = getCell(mx, nb);
  if (shape === null) return null;
  const connects = "F-L".includes(shape);
  return connects ? nb : null;
};

const connectRight = (mx: string[][], pos: [number, number]) => {
  const [x, y] = pos;
  const nb = [x + 1, y];
  const shape = getCell(mx, nb);
  if (shape === null) return null;
  const connects = "J-7".includes(shape);
  return connects ? nb : null;
};

const getNbs = (p: [number, number], matrix: string[][]) => {
  const [x, y] = p;
  const char = getCell(matrix, p);

  const l = connectLeft(matrix, p);
  const r = connectRight(matrix, p);
  const t = connectTop(matrix, p);
  const b = connectBot(matrix, p);

  //   console.log({ char, p, l, r, t, b });

  if (char === "S") return [t, l, r, b];
  if (char === "-") return [l, r];
  if (char === "|") return [t, b];
  if (char === "7") return [l, b];
  if (char === "J") return [t, l];
  if (char === "L") return [t, r];
  if (char === "F") return [b, r];
  return [];
};

const solveMatrix = (matrix: string[][]) => {
  console.log({ matrix });
  //   Start pos
  const dedupe = new Set();
  const start = findStart(matrix);
  dedupe.add(start);
  const netw = new Map();
  let loop = [start];
  //   let loop = [[1, 3]];
  //
  for (let x = 0; x < 5; x++) {
    console.log({ x, loop });
    let next: any[] = [];

    loop.map((pos) => {
      const nbs = getNbs(pos, matrix)?.filter((nb) => {
        if (nb === null) return false;
        return !dedupe.has("" + nb[0] + "," + nb[1]);
      });
      //
      console.log({ pos, nbs });
      netw.set(pos, nbs);
      nbs?.forEach((nb) => {
        if (nb) dedupe.add("" + nb[0] + "," + nb[1]);
        next.push(nb);
      });
    });
    loop = next;
    console.log({ next });
  }

  console.log(netw);
};

//

const testa = `
.....
.S-7.
.|.|.
.L-J.
.....`;

const testb = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const mx = getMatrix(testa);
solveMatrix(mx);
// console.log({ a, mx });
