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

  const p1 = {};
  const p2 = {};
  for (let i = 0; i <= maxSum; ++i) {
    let root = Math.floor(Math.sqrt(i));
    if (i === root * root) {
      if (i <= 100000) {
        p1[i] = 0;
        p2[i] = 0;
      } else {
        p2[i] = 0;
      }
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
    const res = N <= 1000 ? { ...p1 } : { ...p2 };
    for (let i = 1; i < N + 1; ++i) {
      sum += data[i - 1];
      sums.push(sum);
      for (j = 0; j < i; ++j) {
        let d = sum - sums[j];
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
