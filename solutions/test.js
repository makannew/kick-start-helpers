const {
  readLine,
  readArray,
  readIntArray,
  printResult,
  findData,
  depict,
  buildData,
  buildShape,
  analyze,
  combinations,
  iterate,
} = require("../src/index.js");

// Start
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const [R, C] = await readIntArray();
    let data = [];
    for (let i = 0; i < R; ++i) {
      let thisLine = await readLine();
      data = [...data, ...Array.from(thisLine)];
    }
    const { members } = analyze(data);
    const comb = combinations(members);
    let order = -1;
    iterate(
      comb,
      buildShape(members.length),
      buildShape(comb.length),
      (chunk) => {
        const model = buildData(R * C, null);
        let stable = true;
        for (let item of chunk) {
          for (let i = 0, len = data.length; i < len; ++i) {
            if (data[i] === item) {
              model[i] = true;
            }
          }
          for (let i = 0, len = data.length; i < len; ++i) {
            const {
              namedNeighbors: { d },
            } = depict(i, buildShape(C, R));
            if (model[i] === true && model[d] === null) {
              stable = false;
              break;
            }
          }
          if (stable === false) break;
        }
        if (stable) {
          order = chunk.join("");
        }
      }
    );

    printResult(testN, order);
  }
  process.exit();
})().catch((err) => console.log(err));
