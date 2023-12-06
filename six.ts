import inputs from "./inputs";

const x = inputs.six;
const [time, dist] = x.split("\n").map((row) =>
  row
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x))
);

const calcDist = (charge: number, dur: number) => {
  const speed = charge;
  const traveltime = dur - charge;
  const dist = traveltime * speed;
  //   console.log({ dur, charge, traveltime, dist });
  return dist;
};
console.log({ time, dist });

const res = time.map((dur, race) => {
  const rec = dist[race];
  console.log("RACE ", { rec, dur });

  let options = Array();
  for (let charge = 1; charge < dur; charge++) {
    const dist = calcDist(charge, dur);
    // console.log({ charge, dist });
    options.push(dist);
  }
  const beat = options.filter((dist) => dist > rec);
  console.log({ o: options.length, rec, b: beat.length });
  return beat.length;
});

const answer = res.reduce((t, x) => t * x, 1);
console.log({ res, answer });
