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
//
//

// kick-start-helpers webassembly module
// Automatically generated at Mon Jul 27 2020 17:37:47 GMT+0800 (Australian Western Standard Time)
const wasmString =
  "0,97,115,109,1,0,0,0,1,7,1,96,2,124,124,1,124,3,4,3,0,0,0,7,28,3,6,109,117,108,77,111,100,0,0,6,101,120,112,77,111,100,0,1,6,100,105,118,77,111,100,0,2,10,147,1,3,38,0,32,0,176,66,135,148,235,220,3,129,32,1,176,66,135,148,235,220,3,129,126,66,135,148,235,220,3,124,66,135,148,235,220,3,129,185,11,86,2,2,126,1,127,66,1,33,2,32,0,177,66,135,148,235,220,3,130,33,3,32,1,177,66,135,148,235,220,3,130,167,33,4,3,64,32,4,65,1,113,4,64,32,2,32,3,126,66,135,148,235,220,3,130,33,2,11,32,3,32,3,126,66,135,148,235,220,3,130,33,3,32,4,65,1,118,34,4,13,0,11,32,2,186,11,19,0,32,1,68,0,0,128,2,101,205,205,65,16,1,32,0,16,0,11";
const wasmCode = new Uint8Array(wasmString.split(","));
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod } = wasm.exports;

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
    A[0] = (x1 + y1) % F;
    // generate Array A
    let px = x1;
    let py = y1;
    for (let i = 1; i < N; ++i) {
      const nx = (((C * px) % F) + ((D * py) % F) + (E1 % F)) % F;
      const ny = (((D * px) % F) + ((C * py) % F) + (E2 % F)) % F;
      A[i] = (nx + ny) % F;
      px = nx;
      py = ny;
    }
    // calculate total element occurance in contiguous subarrays
    let ans = 0;
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j <= i; ++j) {
        const ni = N - i;
        const nk = K;
        if (j === 0) {
          ans += mulMod(mulMod(A[i], ni), nk);
        } else {
          const r = j + 1;
          let e = mulMod(A[i], expMod(r, nk + 1));
          let p = e - (A[i] % mod);
          if (p < 0) p += mod;
          p = p % mod;
          p = divMod(p, r - 1);
          p = p - A[i];
          if (p < 0) p += mod;
          p = p % mod;
          ans += mulMod(p, ni);
        }

        ans = ans % mod;
      }
    }

    printResult(testN, ans);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
