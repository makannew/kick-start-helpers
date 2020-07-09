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
    permute(
      members,
      (thisOrder, depth) => {
        if (!baseMembers.includes(thisOrder[0])) {
          return false;
        }

        const model = buildData(R * C, null);
        const len = model.length;
        let valid = true;

        for (let k = 0; k < thisOrder.length; ++k) {
          let poly = thisOrder[k];

          for (let j = 0; j < len; ++j) {
            if (data[j] === poly) {
              if (model[j] === null) {
                model[j] = true;
              } else {
                valid = false;
                if (k <= depth) {
                  return false;
                }
              }
            }
          }

          for (let j = 0; j < len; ++j) {
            if (
              model[j] &&
              model[depict(j, buildShape(C, R)).namedNeighbors.d] === null
            ) {
              valid = false;
              if (k <= depth) {
                return true;
              }
            }
          }
        }

        if (valid && !model.includes(null)) {
          order = thisOrder.join("");
          return "break";
        }
        return true;
      },
      true
    );
    printResult(testN, order);
  }
  process.exit();
})().catch((err) => console.log(err));
