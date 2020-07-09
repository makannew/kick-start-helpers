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
  let chunk = 7;
  let b = Date.now();
  let p1 = permute(Array.from(Array(chunk).keys()));
  const ts = Date.now() - b;
  b = Date.now();
  let p2 = recursivePermute(Array.from(Array(chunk).keys()));
  const tr = Date.now() - b;

  let count = 0;
  let matches = [];
  let isEqual = true;
  for (let i = 0, len = p1.length; i < len; i += chunk) {
    const thisChunk = p1.slice(i, i + chunk);
    // console.log(thisChunk);
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
  console.log(`Sorted permute time: ${ts} , Recursive permute time: ${tr}`);

  process.exit();
})().catch((err) => console.log(err));
