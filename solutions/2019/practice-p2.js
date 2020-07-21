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
  //
  const sumArray = [];
  sumArray.length = 5000000;
  for (let testN = 1; testN <= totalTests; ++testN) {
    const [N] = await readIntArray();
    const data = (await readLine()).split("");
    //
    sumArray.fill(0, N);
    let sum = 0;
    let L = N - 1;
    for (let i = 0; i < N; ++i) {
      data[i] = parseInt(data[i], 10);
      sum += data[i];
      sumArray[i] = sum;
    }
    //
    let result = 0;
    let beauty = 0;
    let maxL = 0;
    let maxR = 0;
    for (let i = 0; i < N; ++i) {
      maxL = i >> 1;
      maxR = (L - i) >> 1;
      if (i - maxL > 0) {
        beauty = sumArray[maxR + i] - sumArray[i - maxL - 1];
      } else {
        beauty = sumArray[maxR + i];
      }
      //
      if (beauty > result) {
        result = beauty;
      }
    }

    printResult(testN, result);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
