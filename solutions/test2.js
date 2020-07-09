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
  recursivePermute,
  isEqual,
} = require("../src/index.js");

// Start
(async function main() {
  let chunk = 5;

  let p1 = permute(Array.from(Array(chunk).keys()));
  let p2 = recursivePermute(Array.from(Array(chunk).keys()));
  let count = 0;
  let matches = [];
  let isEqual = true;
  for (let i = 0, len = p1.length; i < len; i += chunk) {
    const thisChunk = p1.slice(i, i + chunk);
    console.log(thisChunk);
    const { result } = findData(
      thisChunk,
      buildShape(chunk),
      p2,
      buildShape(p2.length),
      true
    );
    if (result.length != 1) {
      isEqual = false;
    }
    matches = [...matches, ...result];
  }
  console.log(matches.length, Array.from(new Set(matches)).length, isEqual);
  process.exit();
})().catch((err) => console.log(err));
