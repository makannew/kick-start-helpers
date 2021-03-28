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
    let [X, Y, S] = await readArray();
    const len = S.length;
    X = parseInt(X, 10);
    Y = parseInt(Y, 10);

    let result = 0;
    let chunk = 0;
    let f;
    let l;
    sum = X + Y;
    for (let i = 0; i < len; ++i) {
      let d = S[i];
      if (d === "?") {
        ++chunk;
      } else if (chunk > 0) {
        l = d;
      } else if (chunk === 0) {
        if (f === "C" && d === "J") {
          result += X;
        }
        if (f === "J" && d === "C") {
          result += Y;
        }
        f = d;
      }
      //
      if (chunk > 0 && d !== "?") {
        if (sum >= 0) {
          if (f !== l && f && l) {
            if (l === "J") {
              result += X;
            } else {
              result += Y;
            }
          }
        }
        //
        if (sum < 0) {
          const mult = Math.floor(chunk / 2) + 1;
          const fact = (mult - 1) * sum;
          if (f === l && f && l) {
            result += mult * sum;
          } else if (f === "C" && l === "J") {
            result += mult * sum + X;
          } else if (f === "J" && l === "C") {
            result += mult * sum + Y;
          } else if (!f && !l && chunk > 1) {
            if (X < Y) {
              result += fact + X;
            } else {
              result += fact + Y;
            }
          } else if ((f === "C" && !l) || (!f && l === "J")) {
            if (fact + X < mult * sum) {
              result += fact + X;
            } else {
              result += mult * sum;
            }
          } else if ((f === "J" && !l) || (!f && l === "C")) {
            if (fact + Y < mult * sum) {
              result += fact + Y;
            } else {
              result += mult * sum;
            }
          }
        }

        //
        chunk = 0;
        f = d;
      }
    }

    printResult(testN, result);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
//
//
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}
