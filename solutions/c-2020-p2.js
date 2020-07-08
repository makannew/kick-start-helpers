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
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const [R, C] = await readIntArray();
    let data = [];
    let lastRow;

    for (let i = 0; i < R; ++i) {
      lastRow = await readLine();
      lastRow = Array.from(lastRow);
      data = [...data, ...lastRow];
    }
    const { members } = analyze(data);
    const { members: baseMembers } = analyze(lastRow);
    let order = -1;
    let model;
    permute(members, (thisOrder, index) => {
      if (!baseMembers.includes(thisOrder[0])) {
        return false;
      }

      model = buildData(R * C, null);
      const len = model.length;
      const valids = thisOrder.slice(0, index);
      const poly = thisOrder[index];
      for (let i = 0; i < len; ++i) {
        if (valids.includes(data[i])) {
          model[i] = true;
        }
      }

      for (let j = 0; j < len; ++j) {
        if (data[j] === poly) {
          if (model[j] === null) {
            model[j] = true;
          } else {
            return false;
          }
        }
      }

      for (let j = 0; j < len; ++j) {
        if (
          model[j] &&
          model[depict(j, buildShape(C, R)).namedNeighbors.d] === null
        ) {
          return false;
        }
      }

      if (index === thisOrder.length - 1) {
        if (model.includes(null)) {
          return false;
        } else {
          order = thisOrder.join("");
        }
      }

      return true;
    });

    printResult(testN, order);
  }
  process.exit();
})().catch((err) => console.log(err));
