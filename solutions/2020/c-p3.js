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
  const [T] = await readIntArray();
  //
  const max = 10000000;

  const p = new Array(max * 2);

  //
  for (let testN = 1; testN <= T; ++testN) {
    const [N] = await readIntArray();
    const data = await readIntArray();
    //
    let ans = 0;
    let sum = 0;
    let maxSum = 0;
    //
    p.fill(0);
    p[max] = 1;
    for (let i = 0; i < N; ++i) {
      const thisData = data[i];
      maxSum += thisData > 0 ? thisData : 0;
      sum += thisData;
      let j2;
      let j = -1;
      do {
        ++j;
        j2 = j * j;
        ans += p[max + sum - j2];
      } while (j2 <= maxSum);
      ++p[sum + max];
    }
    printResult(testN, ans);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
