import inputs from "./inputs";

const getInt = (reg: RegExpMatchArray | null) => {
  if (!reg) return 0;

  const str = reg[1];
  let x = parseInt(str);
  if (isNaN(x)) {
    if (str === "one") x = 1;
    if (str === "two") x = 2;
    if (str === "three") x = 3;
    if (str === "four") x = 4;
    if (str === "five") x = 5;
    if (str === "six") x = 6;
    if (str === "seven") x = 7;
    if (str === "eight") x = 8;
    if (str === "nine") x = 9;
  }
  return x;
};

const res = inputs.one
  .split("\n")
  //   .slice(0, 100)
  .map((line) => {
    const reg =
      /(?=(one|two|three|four|five|six|seven|eight|nine|[123456789]))/g;
    const arr = [...line.matchAll(reg)];

    const first = arr[0];
    const last = arr[arr.length - 1];

    const a = getInt(first);
    const b = getInt(last);
    const val = a * 10 + b;

    // console.log({ line, val });
    return val;
  });

const sum = res.reduce((tot, x) => tot + x, 0);
// console.log(res);
console.log({ sum });
