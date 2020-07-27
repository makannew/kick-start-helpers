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
//

// Start
(async function main() {
  //
  const [totalTests] = await readIntArray();
  const mod = 1000000007;
  //
  for (let testN = 1; testN <= totalTests; ++testN) {
    const [N, K, x1, y1, C, D, E1, E2, F] = await readIntArray();
    //
    const A = [];
    A.length = N;
    A[0] = mulMod((x1 + y1) % F, N);
    let sum = A[0];
    // generate Array A
    let px = x1;
    let py = y1;
    for (let i = 1; i < N; ++i) {
      const nx = (((C * px) % F) + ((D * py) % F) + (E1 % F)) % F;
      const ny = (((D * px) % F) + ((C * py) % F) + (E2 % F)) % F;
      A[i] = mulMod((nx + ny) % F, N - i);
      sum += A[i];
      sum %= mod;
      px = nx;
      py = ny;
    }
    //
    let ans = mulMod(sum, K);
    for (let i = 2; i <= N; ++i) {
      sum -= A[i - 2];
      ans += mulMod(sum, divMod(expMod(i, K + 1) - 1, i - 1));
      ans -= sum;
      if (ans < 0) {
        ans += mod;
      }
      ans %= mod;
    }

    printResult(testN, ans);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
