const fs = require("fs");
const buf = fs.readFileSync(`${__dirname}/functions.wasm`);
const wasmCode = new Uint8Array(buf);
//
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod } = wasm.exports;
//
module.exports = {
  mulMod,
  expMod,
  divMod,
};
