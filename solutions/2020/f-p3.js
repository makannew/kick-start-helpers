/**
 * Javacript boilerplate
 * for Google kick start competition
 *
 * @link https://github.com/makannew/kick-start-helpers
 *
 * @author Makan Edrisi
 *
 * @ since 2020
 * built at Tue Sep 29 2020 15:48:29 GMT+0800 (Australian Western Standard Time)
 */
let inputBuffer = [];
const nullFunc = () => null;
let checkAvailableInput = nullFunc;
const readlineModule = require("readline");
syncWithConsole(readlineModule);

function syncWithConsole(readlineModule) {
  const readInputLine = readlineModule.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readInputLine.on("line", (input) => {
    inputBuffer.push(input);
    checkAvailableInput();
  });
}

async function readLine() {
  return new Promise((resolve, reject) => {
    checkAvailableInput = () => {
      if (inputBuffer.length > 0) {
        checkAvailableInput = nullFunc;
        resolve(inputBuffer.shift());
      }
    };
    checkAvailableInput();
  });
}

async function readArray() {
  const newLine = await readLine();
  const inputArray = newLine.split(" ");
  return inputArray;
}

async function readIntArray() {
  const data = await readArray();
  for (let i in data) {
    data[i] = parseInt(data[i], 10);
  }
  return data;
}
// kick-start-helpers webassembly module
// Automatically generated at Tue Sep 29 2020 15:48:19 GMT+0800 (Australian Western Standard Time)
const wasmString =
  "0,97,115,109,1,0,0,0,1,7,1,96,2,124,124,1,124,3,5,4,0,0,0,0,7,37,4,6,109,117,108,77,111,100,0,0,6,101,120,112,77,111,100,0,1,6,100,105,118,77,111,100,0,2,6,105,110,116,68,105,118,0,3,10,158,1,4,38,0,32,0,176,66,135,148,235,220,3,129,32,1,176,66,135,148,235,220,3,129,126,66,135,148,235,220,3,124,66,135,148,235,220,3,129,185,11,86,2,2,126,1,127,66,1,33,2,32,0,177,66,135,148,235,220,3,130,33,3,32,1,177,66,135,148,235,220,3,130,167,33,4,3,64,32,4,65,1,113,4,64,32,2,32,3,126,66,135,148,235,220,3,130,33,2,11,32,3,32,3,126,66,135,148,235,220,3,130,33,3,32,4,65,1,118,34,4,13,0,11,32,2,186,11,19,0,32,1,68,0,0,128,2,101,205,205,65,16,1,32,0,16,0,11,10,0,32,0,176,32,1,176,127,186,11";
const wasmCode = new Uint8Array(wasmString.split(","));
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod, intDiv } = wasm.exports;
//
// Start
//
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const [S, Ar, Ac, Br, Bc, C] = await readIntArray();
    const ground = [];
    //
    function getIndex(r, c) {
      let pos = 0;
      for (let i = 1; i < r; ++i) {
        pos += (i - 1) * 2 + 1;
      }
      return pos + c - 1;
    }
    // Data structure
    for (let i = 1; i <= S; ++i) {
      for (let j = 1; j <= (i - 1) * 2 + 1; ++j) {
        const index = getIndex(i, j);
        ground[index] = { connections: [], painted: false };
        if (j !== 1) {
          ground[index].connections.push(index - 1);
        }
        if (j !== (i - 1) * 2 + 1) {
          ground[index].connections.push(index + 1);
        }
        if (j % 2) {
          // odd
          if (i !== S) {
            ground[index].connections.push(getIndex(i + 1, j + 1));
          }
        } else {
          if (i !== 1) {
            ground[index].connections.push(getIndex(i - 1, j - 1));
          }
        }
      }
    }
    // Under constructions
    for (let i = 0; i < C; ++i) {
      const [r, c] = await readIntArray();
      ground[getIndex(r, c)].painted = true;
    }
    // initial painted
    ground[getIndex(Ar, Ac)].painted = true;
    ground[getIndex(Br, Bc)].painted = true;
    // All permutations
    function permute(playerATurn, playerAIdx, playerBIdx, prevScore) {
      console.log(
        "A turn=",
        playerATurn,
        " A idx=",
        playerAIdx,
        " B idx=",
        playerBIdx
      );
      if (playerATurn) {
        let score;
        for (let idx of ground[playerAIdx].connections) {
          if (!ground[idx].painted) {
            ground[idx].painted = true;
            const thisScore = permute(false, idx, playerBIdx, prevScore + 1);
            // revert
            ground[idx].painted = false;
            if (thisScore === undefined) {
              continue;
            }
            if (score === undefined) {
              score = thisScore;
            }
            if (thisScore > score) {
              score = thisScore;
            }
          }
        }
        return score;
      }
      //
      if (!playerATurn) {
        let score;
        for (let idx of ground[playerBIdx].connections) {
          if (!ground[idx].painted) {
            ground[idx].painted = true;
            const thisScore = permute(true, playerAIdx, idx, prevScore - 1);
            // revert
            ground[idx].painted = false;

            if (score === undefined) {
              score = thisScore;
            }

            if (thisScore < score) {
              score = thisScore;
            }
          }
        }
        if (score === undefined) {
          score = prevScore;
        }
        return score;
      }
    }

    printResult(testN, permute(true, getIndex(Ar, Ac), getIndex(Br, Bc), 0));
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
//
//
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}
