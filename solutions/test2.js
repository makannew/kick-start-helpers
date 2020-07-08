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
} = require("../src/index.js");

// Start
(async function main() {
  permute(["A", "B", "C"]);
  process.exit();
})().catch((err) => console.log(err));
