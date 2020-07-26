const fs = require("fs");
const buf = fs.readFileSync("./functions.wasm");
const wasmCode = new Uint8Array(buf);
//
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { add, mulMod } = wasm.exports;
console.log("add=", add(5, 6));
console.log("mulMod=", mulMod(1234567890144, 3210987654344));
console.log("BigInt=", (1234567890144n * 3210987654344n) % 1000000007n);
