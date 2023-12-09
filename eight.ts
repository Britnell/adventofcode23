import inputs from "./inputs";

// const ip = inputs.eighttwo;
const ip = inputs.eight;

const [dirs, n] = ip.split("\n\n");
const network = new Map();

let pos = "AAA";
let poss: string[] = [];

n.split("\n").map((row, i) => {
  const [from, lr] = row.split("=").map((s) => s.trim());

  if (from.charAt(2) === "A") {
    poss.push(from);
  }
  const [L, R] = lr.split(", ").map((str) => str.replaceAll(/[\(\)]/g, ""));
  network.set(from, { L, R });
});

console.log({ dirs, poss });

let count = 0;
let d = 0;

// ONE

// for (let l = 0; l < dirs.length; l++) {
// while (pos !== "ZZZ") {
//   const dir = dirs[d];
//   const node = network.get(pos);
//   const next = node[dir];
//   console.log({ dir, pos, next, d, count });
//   pos = next;
//   count++;
//   d = (d + 1) % dirs.length;
// }

// TWO

const allEndZ = (list: string[]) =>
  list.map((st) => st.charAt(2) === "Z").filter((x) => x === false).length ===
  0;

// for (let l = 0; l < 10; l++) {
while (!allEndZ(poss)) {
  const dir = dirs[d];

  poss = poss.map((pos) => {
    const node = network.get(pos);
    const next = node[dir];
    // console.log({ dir, pos, next, d, count });
    return next;
  });

  //   console.log({ d, poss, count });
  //   if (count % 1000000 === 0) console.log(count);

  count++;
  d = (d + 1) % dirs.length;
}

console.log({ count });
