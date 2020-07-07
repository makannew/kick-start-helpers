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
  combine,
  iterate,
} = require("../src/index.js");

// Start
(async function main() {
  const data = ["A", "B", "C"];
  console.log(
    combine(data, (data, index) => {
      if (index >= 1) {
        if (data[1] === "B") {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
  );
  process.exit();
})().catch((err) => console.log(err));
