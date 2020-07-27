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
  mulMod,
  expMod,
  divMod,
} = require("../../build/local.js");

// Start
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const [R, C] = await readIntArray();
    let data = [];
    for (let i = 0; i < R; ++i) {
      const thisRow = await readLine();
      data = [...data, ...Array.from(thisRow)];
    }
    const { members } = analyze(data);

    let order = [];
    for (let i = 0, len = members.length; i < len; ++i) {
      for (let poly of members) {
        if (!order.includes(poly)) {
          const bases = getBase(poly);
          let reject = false;
          for (let base of bases) {
            if (!order.includes(base)) {
              reject = true;
            }
          }
          if (!reject) {
            order.push(poly);
          }
        }
      }
    }

    if (order.length === members.length) {
      order = order.join("");
    } else {
      order = -1;
    }

    printResult(testN, order);
    // functions
    function getBase(poly) {
      const result = [];
      for (let i = 0, len = data.length; i < len; ++i) {
        if (data[i] === poly) {
          const dp = i + C < len ? data[i + C] : null;
          if (dp && dp !== poly) {
            result.push(dp);
          }
        }
      }
      return Array.from(new Set(result));
    }
  }
  process.exit();
})().catch((err) => console.log(err));
