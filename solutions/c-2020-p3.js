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
} = require("../src/index.js");

// Start
(async function main() {
  const [T] = await readIntArray();
  // calc perfects
  const maxSum = 100 * 100000;

  const p = {};
  for (let i = 0; i <= maxSum; ++i) {
    let root = Math.floor(Math.sqrt(i));
    if (i === root * root) {
      p[i] = 0;
    }
  }
  //
  for (let testN = 1; testN <= T; ++testN) {
    const [N] = await readIntArray();
    const data = await readIntArray();
    //
    let total = 0;
    //
    let sum = 0;
    const sums = [sum];
    for (let i = 0; i < N; ++i) {
      sum += data[i];
      sums.push(sum);
    }
    //
    const res = { ...p };
    for (let i = 1; i < N + 1; ++i) {
      for (j = 0; j < i; ++j) {
        let d = sums[i] - sums[j];
        if (d >= 0) {
          ++res[d];
        }
      }
    }
    //
    const all = Object.values(res);
    for (let i = 0, len = all.length; i < len; ++i) {
      let c = all[i];
      if (c > 0) {
        total += c;
      }
    }
    printResult(testN, total);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
