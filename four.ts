import inputs from "./inputs";

const cards = inputs.four
  .split("\n")
  .map((s) => s.trim())
  .map((line) => {
    const [card, table] = line.split(":");
    const [a, b] = table.split("|");
    // console.log({ a, b });

    const winning = a
      .trim()
      .split(" ")
      .map((str) => parseInt(str))
      .filter((x) => !isNaN(x));
    const chosen = b
      .trim()
      .split(" ")
      .map((str) => parseInt(str))
      .filter((x) => !isNaN(x));
    // console.log({ card, winning, chosen });
    return { card, winning, chosen };
  });

const scoreCard = (card: { winning: number[]; chosen: number[] }) => {
  const match = card.winning.map((num) => {
    if (card.chosen.includes(num)) return num;
    else return 0;
  });
  const correct = match.filter((x) => x !== 0).length;
  return correct;
  let score = 0;
  if (correct !== 0) score = Math.pow(2, correct - 1);
  return score;
};

// const scores = cards.map(scoreCard);
// const sum = scores.reduce((t, x) => t + x, 0);
// console.log({ scores, sum });

// PART TWO

const matrix = cards.map((card, c) => {
  const N = scoreCard(card);
  let evals = [];
  for (let x = 0; x < N; x++) {
    evals.push(c + 1 + x);
  }
  //   const evals = (c + 1, c + 1 + N);
  //   console.log({ c, card, N, evals });
  return evals;
});

const newLoop = (start: number) => {
  let loop: { [x: number]: number } = {};
  for (let x = 0; x < cards.length; x++) {
    loop[x] = start;
  }
  return loop;
};

let loop = newLoop(1);

// const sum = scores.reduce((t, x) => t + x, 0);
// console.log({ sum });
const getTotal = (m: { [k: string]: number }) =>
  Object.values(m).reduce((t, x) => t + x, 0);

console.log({ matrix });
console.log({ loop }, getTotal(loop));

let sum = 0;

// for (let l = 0; l < 10; l++) {
while (getTotal(loop) > 0) {
  console.log(sum);

  const next = newLoop(0);
  // tot = getTotal(loop);
  sum += getTotal(loop);

  Object.entries(loop).forEach(([k, v]) => {
    const card = matrix[k];
    for (let x = 0; x < v; x++) {
      card.forEach((c) => {
        next[c]++;
      });
    }
  });
  // tot = getTotal(next);
  // console.log({ l, next, tot });
  // if (tot === 0) break;
  loop = next;
}

console.log({ sum });
