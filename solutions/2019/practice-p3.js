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
  binaryExp,
} = require("../../src/index.js");

// Start
(async function main() {
  //
  const [totalTests] = await readIntArray();
  const mod = 1000000007n;
  //
  for (let testN = 1; testN <= totalTests; ++testN) {
    const [N, K, x1, y1, C, D, E1, E2, F] = await readIntArray();
    //
    const A = [];
    A.length = N;
    A[0] = BigInt((x1 + y1) % F);
    // generate Array A
    let px = x1;
    let py = y1;
    for (let i = 1; i < N; ++i) {
      const nx = (((C * px) % F) + ((D * py) % F) + (E1 % F)) % F;
      const ny = (((D * px) % F) + ((C * py) % F) + (E2 % F)) % F;
      A[i] = BigInt((nx + ny) % F);
      px = nx;
      py = ny;
    }
    // calculate total element occurance in contiguous subarrays
    let ans = 0n;
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j <= i; ++j) {
        const ni = BigInt(N - i);
        const nk = BigInt(K);
        if (j === 0) {
          ans += ((((A[i] % mod) * ni) % mod) % mod) * nk;
        } else {
          const r = BigInt(j + 1);
          let e = binaryExp(r, nk + 1n, mod);
          e = (A[i] % mod) * e;
          let p = A[i] % mod;
          p = (e % mod) - p;

          if (p < 0) p += mod;
          p = p % mod;
          let d = binaryExp(r - 1n, mod - 2n, mod);
          p = (p * d) % mod;
          p = p - A[i];
          if (p < 0) p += mod;
          p = p % mod;

          ans += p * ni;
        }

        ans = ans % mod;
      }
    }

    printResult(testN, ans);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
