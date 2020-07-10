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
  const data = [1, 2, 3, 4];
  const result = permute(data, validate, true);
  // iterate(result, buildShape(4), buildShape(result.length), (chunk) => {
  //   console.log(chunk);
  // });
  for (let i = 0; i < result.length; i += 4) {
    // console.log(result.slice(i, i + 4));
  }
  console.log("Length=", result.length / 4);
  process.exit();
})().catch((err) => console.log(err));

function validate(p, d) {
  return true;
  if (p[0] === 2) return false;
  return true;
}
