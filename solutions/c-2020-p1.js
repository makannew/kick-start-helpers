// To run code in online competition node.js just
// replace below code (const {...}="require("...")" )
// with content of index.js
const {
  combinations,
  parseAll,
  ra,
  rl,
  findData,
  depict,
  mergeData,
  buildData,
  buildShape,
  analyze,
  printResult,
} = require("../src/index.js");

// Start
(async function main() {
  const [T] = await ra();

  for (let testN = 1; testN <= T; ++testN) {
    const [N, K] = await ra();
    const data = await ra();
    parseAll(data);
    let matchData = [];
    for (let j = K; j > 0; --j) {
      matchData.push(j);
    }
    parseAll(matchData);
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
