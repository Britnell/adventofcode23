import inputs from "./inputs";

const rank = inputs.seven
  .split("\n")
  .map((line) => line.split(" "))
  .map(([hand, bid]) => ({ hand, bid: parseInt(bid) }));

const cardVals = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1, // PART TWO
  //   J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
} as const;

type Cards = keyof typeof cardVals;

const compCard = (a: Cards, b: Cards) => {
  const va = cardVals[a];
  const vb = cardVals[b];
  return va - vb;
};

const getType = (hand: string) => {
  const joker = [...hand.matchAll(/[J]/g)].length;
  hand = hand.replaceAll("J", "");

  const dic: { [k: string]: number } = {};
  for (let l = 0; l < hand.length; l++) {
    const card = hand[l];
    if (dic[card] === undefined) dic[card] = 1;
    else dic[card]++;
  }
  const nums = Object.values(dic);
  nums.sort((a, b) => b - a);

  //   console.log({ hand, joker });
  const wjoker = nums[0] + joker;

  // 4 of a kind
  if (joker === 5) return 0;
  if (wjoker === 5) return 0;
  if (wjoker === 4) return 1;
  // full house
  if (wjoker === 3 && nums[1] === 2) return 2;
  // 3 kind
  if (wjoker === 3) return 3;
  // 2 pais
  if (wjoker === 2 && nums[1] === 2) return 4;
  // pair
  if (wjoker === 2) return 5;
  // nada
  return 6;
};

const vs = (a: string, b: string) => {
  let res;
  for (let x = 0; x < 5; x++) {
    const t = compCard(a.charAt(x) as Cards, b.charAt(x) as Cards);
    if (t !== 0) {
      res = t;
      break;
    }
  }
  return res;
};

const compare = (a: string, b: string) => {
  const ta = getType(a);
  const tb = getType(b);
  //   console.log({ a, ta, b, tb });

  if (ta === tb) return vs(a, b);
  return tb - ta;
};
// compare(rank[0].hand, rank[1].hand);
rank.sort((a, b) => compare(a.hand, b.hand));

const wins = rank.map((hand, rank) => (rank + 1) * hand.bid);
const sum = wins.reduce((a, b) => a + b, 0);
// console.log(rank);
// console.log(wins);
console.log({ sum });
