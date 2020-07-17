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
  permute,
  iterate,
} = require("../../src/index.js");

// Start
(async function main() {
  const [totalTests] = await readIntArray();

  for (let testN = 1; testN <= totalTests; ++testN) {
    const [A, B] = await readIntArray();
    const [N] = await readIntArray();
    //
    let U = B + 1;
    let L = A;
    for (let i = 0; i < N; ++i) {
      const g = Math.round((U - L) / 2) + L;
      console.log(g);
      const res = await readLine();
      if (res === "TOO_BIG") {
        U = g;
      } else if (res === "TOO_SMALL") {
        L = g;
      } else if (res === "CORRECT") {
        break;
      } else {
        process.exit();
      }
    }

    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
