const fs = require("fs");
const buf = fs.readFileSync("./add.wasm");
const wasmCode = new Uint8Array(buf);
// console.log(wasmCode);
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { add } = wasm.exports;
console.log(add(5, 6));
