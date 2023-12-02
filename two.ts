import inputs from "./inputs";

const res = inputs.two
  .split("\n")
  //   .slice(0, 10)
  .map((line) => {
    const id = line.split(":")[0].trim();
    const x = line.split(":")[1].trim();

    let possible = true;

    x.split(";").map((round) => {
      const cubes = round.split(",").map((cube) => {
        const [n, col] = cube.trim().split(" ");
        const no = parseInt(n);
        if (isNaN(no)) return;
        if (col === "red" && no > 12) possible = false;
        if (col === "green" && no > 13) possible = false;
        if (col === "blue" && no > 14) possible = false;

        // console.log({ cube, no });
      });
    });

    const val = id.split(" ")[1];
    // console.log({ x, possible, val });

    if (!possible) return 0;
    return parseInt(val);
  });

const two = inputs.two
  .split("\n")
  //   .slice(0, 10)
  .map((line) => {
    const id = line.split(":")[0].trim();
    const x = line.split(":")[1].trim();

    const mins = {
      red: 0,
      blue: 0,
      green: 0,
    };

    x.split(";").map((round) => {
      round.split(",").map((cube) => {
        const [n, col] = cube.trim().split(" ");
        const no = parseInt(n);
        if (isNaN(no)) return;

        if (mins[col] < no) mins[col] = no;

        // console.log({ cube, no });
      });
    });

    const pow = mins.red * mins.blue * mins.green;

    // console.log({ line, mins, pow });
    return pow;
  });
const sum = two.reduce((a, b) => a + b, 0);
console.log({ two, sum });
