const { readArray } = require(".");

(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    // Here is solution for test

    printResult(testN, totalMatch);
  }
  process.exit();
})().catch((err) => console.log(err));
