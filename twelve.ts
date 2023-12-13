import inputs from "./inputs";

const test = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const rows = test.trim().split("\n").slice(0, 3);
// const rows = inputs.twelve.trim().split("\n").slice(10, 20);

let total = 0;

const unfold = (row: string, join: string) => {
  return row + join + row + join + row + join + row + join + row;
};

rows.map((line, r) => {
  //   return;
  console.log(r, rows.length);

  const [_row, _nums] = line.split(" ");
  const row = unfold(_row, "?");
  const nums = unfold(_nums, ",");

  // const row = unfold(row)
  const conti = nums.split(",").map((x) => parseInt(x));
  const unknown = [...row.matchAll(/[?]/g)].map((reg) => reg.index);
  //   const groups = [...row.matchAll(/[?#]+/g)].map((reg) => reg[0].length);
  //   console.log({ r, row, nums, conti, unknown });

  const L = unknown.length;
  const N = Math.pow(2, L);
  const possibility = row.split("");
  let count = 0;

  console.log({ N });
  //   console.log({ groups });

  // Brute force all possibilities
  for (let possib = 0; possib < N; possib++) {
    let s = possib.toString(2).split("");
    if (s.length < L) {
      s = [...Array(L - s.length).fill("0"), ...s];
    }
    // fill in #/.
    for (let u = 0; u < L; u++) {
      const i = unknown[u];
      if (i !== undefined) {
        possibility[i] = s[u] === "0" ? "." : "#";
      }
    }
    const possVal = evalRow(possibility.join(""));
    // console.log(s);
    // console.log(possibility, possVal, conti);
    if (conti.join(",") === possVal.join(",")) count++;
  }
  //
  total += count;
  console.log({ count });
});

// rows.map((line, r) => {
//   const [row, nums] = line.split(" ");
//   const conti = nums.split(",").map((x) => parseInt(x));

// });
// console.log({ total });

function evalRow(row: string) {
  return [...row.matchAll(/[#]+/g)].map((reg) => reg[0].length);
}
