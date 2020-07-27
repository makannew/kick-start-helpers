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
