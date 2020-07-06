// To run code in online competition node.js just
// replace below code (const {...}="require("...")" )
// with content of index.js
const {
  readLine,
  readArray,
  readIntArray,
  printResult,
  findData,
  depict,
  mergeData,
  buildData,
  buildShape,
  analyze,
  combinations,
} = require("../src/index.js");

// Start
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const [N, K] = await readIntArray();
    const data = await readIntArray();
    let matchData = [];
    for (let j = K; j > 0; --j) {
      matchData.push(j);
    }
    const { totalMatch } = findData(
      matchData,
      buildShape(K),
      data,
      buildShape(data.length)
    );
    printResult(testN, totalMatch);
  }
  process.exit();
})().catch((err) => console.log(err));
