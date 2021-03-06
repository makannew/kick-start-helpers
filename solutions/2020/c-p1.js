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
  mulMod,
  expMod,
  divMod,
} = require("../../build/local.js");

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
    const { result } = findData(
      matchData,
      buildShape(K),
      data,
      buildShape(data.length)
    );
    printResult(testN, result.length);
  }
  process.exit();
})().catch((err) => console.log(err));
