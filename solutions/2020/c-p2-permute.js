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
    let { members } = analyze(data);
    let order = -1;
    let pOrder;
    permute(members, (p) => {
      if (p.length === members.length) {
        pOrder = [];
      }
      let thisPoly = p[0];
      pOrder.push(thisPoly);
      for (let i = 0, len = R * C; i < len; ++i) {
        if (data[i] === thisPoly) {
          const dp = i + C < len ? data[i + C] : thisPoly;
          if (pOrder.includes(dp)) {
          } else {
            pOrder.pop();
            return false;
          }
        }
      }
      if (p.length === 1) {
        order = pOrder.join("");
        return null;
      }
      return true;
    });

    printResult(testN, order);
  }
  process.exit();
})().catch((err) => console.log(err));
