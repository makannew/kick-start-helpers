// command = npm run build
// or (node build)
const fs = require("fs");
process.chdir(__dirname);
const boilerplate = fs.readFileSync("./boilerplate.js");
const helpers = fs.readFileSync("./helpers.js");
const wasm = fs.readFileSync("../webassembly/wasm.js");
const template = fs.readFileSync("./template.js");

const info = `
/**
* Javacript boilerplate and helper functions
* for Google kick start competition
*
* @link https://github.com/makannew/kick-start-helpers
*
* @author Makan Edrisi
*
* @ since 2020
*/\n`;

const allExports = `
module.exports = {
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
};
\n
`;

const mainParts = info + boilerplate + helpers + wasm;
fs.writeFileSync("../build/local.js", mainParts + allExports);
fs.writeFileSync("../build/compete.js", mainParts + template);
