import inputs from "./inputs";

const [toseeds, tosoil, tofert, towat, tolight, totemp, tohum, toloc] =
  inputs.five.split("\n\n").map((section, s) => {
    const [id, vals] = section.split(":");
    return [id, vals.trim()];
  });

console.log({ toseeds, tosoil, tofert, towat, tolight, totemp, tohum, toloc });

const convert = (map: string, seed: number) => {
  const matrix = map
    .split("\n")
    .map((row) => row.split(" ").map((x) => parseInt(x)));

  let res = seed;
  matrix.map((row) => {
    const [dest, min, len] = row;
    if (seed >= min && seed < min + len) res = dest + (seed - min);
    // console.log({ row, dest, min, len, res });
  });

  //   console.log({ seed, res });
  return res;
};

function solve(seeds: number[]) {
  const soil = seeds.map((seed) => convert(tosoil[1], seed));
  console.log({ soil });

  const fert = soil.map((s) => convert(tofert[1], s));
  console.log({ fert });

  const water = fert.map((s) => convert(towat[1], s));
  console.log({ water });

  const light = water.map((s) => convert(tolight[1], s));
  console.log({ light });

  const temp = light.map((s) => convert(totemp[1], s));
  console.log({ temp });

  const hum = temp.map((s) => convert(tohum[1], s));
  console.log({ hum });

  const loc = hum.map((s) => convert(toloc[1], s));
  loc.sort((a, b) => a - b);

  console.log({ loc });

  const min = loc[0];

  console.log({ min });
  return min;
}

// const seedsOne = toseeds[1].split(" ").map((x) => parseInt(x));
// solve(seedsOne)

// Well this is obviously a bit of a calculation problem...
// dont think js is great for this anymore ...
const mins = [];
const seedsTwo = toseeds[1].split(" ").map((x) => parseInt(x));
for (let s = 0; s < seedsTwo.length; s += 2) {
  const seeds = [];
  const start = seedsTwo[s];
  const len = seedsTwo[s + 1];
  console.log({ start, len });
  // the array is so big js is taking forever just to fill it...
  for (let x = 0; x < len; x++) {
    seeds.push(start + x);
  }
  const min = solve(seeds);
  mins.push(min);
  console.log({ min });
}

console.log(mins);
