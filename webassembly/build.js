const fs = require("fs");
const buf = fs.readFileSync("./functions.wasm");
const wasmCode = new Uint8Array(buf);
//
let code = "// kick-start-helpers webassembly module\n";
code += `// Automatically generated at ${new Date(Date.now()).toString()}\n`;
code += `const wasmString = "${wasmCode.toString()}"\n`;
code += `const wasmCode = new Uint8Array(wasmString.split(","));\n`;
code += "const wasmModule = new WebAssembly.Module(wasmCode, {});\n";
code += "const wasm = new WebAssembly.Instance(wasmModule);\n";
code += "const { mulMod, expMod, divMod } = wasm.exports;\n";

fs.writeFileSync("function-js.txt", code);
