const fs = require("fs");
const buf = fs.readFileSync("./functions.wasm");
const wasmCode = new Uint8Array(buf);
//
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod } = wasm.exports;
// start tests
console.log("\b");
console.log("\b", "Start testing...", "\b");

//
const biliSeven = 1000000007n;
// mulMod test
const mulModSamples = [
  [1234567890144, 3210987654344],
  [3210987654344, -3210987654344],
  [-1000000007, -3210987654344],
  [-1234567890144, 3210987654344],
  [0, 3210987654344],
  [9007199254740991, 1],
  [9007199254740991, 9007199254740991],
];
for (let sample of mulModSamples) {
  testMulMod(sample);
}
function testMulMod([a, b]) {
  const an = BigInt(a);
  const bn = BigInt(b);
  const resMulMod = mulMod(a, b);
  const resBigInt = Number((an * bn) % biliSeven);
  if (resMulMod === resBigInt) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "mulMod test passed",
      "BigInt calc == mulMod calc ==",
      resMulMod
    );
  } else {
    throw console.error(
      "\x1b[41m%s\x1b[0m",
      "mulMod test failed:",
      `mulMod calc:${resMulMod} !== BigInt calc:${resBigInt}`
    );
  }
}
//
// expMod (exponentiatian modulo) test
const expModSamples = [
  [1, 100],
  [2, 64],
  [5, 30],
  [0, 8],
  [1200, 100],
  [13673, 0],
];
for (let sample of expModSamples) {
  testExpMod(sample);
}
function testExpMod([a, b]) {
  const an = BigInt(a);
  const bn = BigInt(b);
  const resExpMod = expMod(a, b);
  const resBigInt = Number(an ** bn % biliSeven);
  if (resExpMod === resBigInt) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "expMod test passed",
      "BigInt calc == expMod calc ==",
      resExpMod
    );
  } else {
    throw console.error(
      "\x1b[41m%s\x1b[0m",
      "expMod test failed:",
      `expMod calc:${resExpMod} !== BigInt calc:${resBigInt}`
    );
  }
}
//
// divMod test
const divModSamples = [
  [1234567890, 987654],
  [123456789012345, 64],
  [50, 356827],
  [0, 86847],
  [1200, 1],
  [9007199254740991, 2352],
  [1, 9007199254740991],
  [-1234567890, 987654],
  [123456789012345, -64],
  [-50, -356827],
];

for (let sample of divModSamples) {
  testDivMod(sample);
}
function testDivMod([a, b]) {
  const an = BigInt(a);
  const bn = BigInt(b);
  const resDivMod = divMod(a, b);
  const bigExp = BigInt(expMod(Number(bn % biliSeven), Number(biliSeven - 2n)));
  const resBigInt = Number(((an % biliSeven) * bigExp) % biliSeven);
  if (resDivMod === resBigInt) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "divMod test passed",
      "BigInt calc == divMod calc ==",
      resDivMod
    );
  } else {
    throw console.error(
      "\x1b[41m%s\x1b[0m",
      "divMod test failed:",
      `divMod calc:${resDivMod} !== BigInt calc:${resBigInt}`
    );
  }
}

//
console.log("\b");
