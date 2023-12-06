import inputs from "./inputs";

const rows = inputs.threetest.split("\n").map((r) => r.trim());

const partone = rows.map((line, l) => {
  const nums = [...line.matchAll(/(\d+)/g)];
  const lineBef = l > 0 ? rows[l - 1] : "";
  const lineAft = rows[l + 1] ?? "";

  // if (l !== 2) return;

  // console.log({ lineBef, });
  // console.log({ line });
  // console.log({ lineAft });

  return nums.map((no) => {
    if (no.index === undefined) return;
    const beg = no.index;
    const end = no.index + no[0].length;

    let around = "";
    const safe = beg - 1 < 0 ? 0 : beg - 1;
    around += lineBef.slice(safe, end + 1);

    around += lineAft.slice(safe, end + 1);

    if (beg > 0) {
      around += line.charAt(beg - 1);
    }
    if (end < line.length) {
      around += line.charAt(end);
    }
    const hasSymbol = around.match(/([^\d\s.])/);

    // console.log({ no, around, sym: !!hasSymbol });

    if (hasSymbol === null) return 0;

    const int = parseInt(no);
    // console.log({ int });
    // console.log({ around });

    return int;
  });
});

// const asone = partone.reduce((t, x) => [...t, ...x], []);
// const sum = asone.reduce((t, x) => t + x, 0);
// console.log({ asone, sum });

const allgears = {};

const parttwo = rows.map((line, l) => {
  const nums = [...line.matchAll(/(\d+)/g)];
  const lineBef = l > 0 ? rows[l - 1] : "";
  const lineAft = rows[l + 1] ?? "";

  // if (l !== 2) return;

  // console.log({ lineBef, });
  console.log({ line });
  // console.log({ lineAft });

  return nums.map((no) => {
    if (no.index === undefined) return;
    const beg = no.index;
    const end = no.index + no[0].length;

    let around = "";
    const safe = beg - 1 < 0 ? 0 : beg - 1;
    around += lineBef.slice(safe, end + 1);

    around += lineAft.slice(safe, end + 1);

    if (beg > 0) {
      around += line.charAt(beg - 1);
    }
    if (end < line.length) {
      around += line.charAt(end);
    }
    const gears = [...around.matchAll(/[*]/g)];
    const int = parseInt(no);

    // the line L is not accurate, as i dont note when a gear comes from above or below this line
    //  need to separate logic for current line, linebef & lineafter
    gears.forEach((gear) => {
      const i = gear.index;
      const ix = `${l},${i}`;
      if (!allgears[ix]) {
        allgears[ix] = [int];
      } else {
        allgears[ix].push(int);
      }
      console.log({ no, int, around, i, l });
    });
    return int;
  });
});

console.log(allgears);
