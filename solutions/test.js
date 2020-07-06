const {
  readLine,
  readArray,
  readIntArray,
  printResult,
  findData,
  depict,
  mergeData,
  buildData,
  buildShape,
  analyze,
  combinations,
  iterate,
} = require("../src/index.js");

// Start
(async function main() {
  const data = Array.from(Array(27).keys());
  iterate(
    data,
    buildShape(1, 3, 3),
    buildShape(3, 3, 3),
    (chunk, mask, pos) => {
      console.log("chunk=", chunk, "Mask=", mask, "pos=", pos);
    }
  );
  process.exit();
})().catch((err) => console.log(err));
