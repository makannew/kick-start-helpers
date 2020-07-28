/**
 * Javacript boilerplate and helper functions
 * for Google kick start competition
 *
 * @link https://github.com/makannew/kick-start-helpers
 *
 * @author Makan Edrisi
 *
 * @ since 2020
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
function buildData(len, fill) {
  const result = [];
  result.length = len;
  if (Array.isArray(fill)) {
    let numerator = 0;
    for (let i = 0, len = result.length; i < len; ++i) {
      result[i] = fill[numerator];
      ++numerator;
      if (numerator >= fill.length) {
        numerator = 0;
      }
    }
  } else {
    result.fill(fill);
  }
  return result;
}

function buildShape(x = 1, y = 1, z = 1) {
  return { x, y, z };
}

function analyze(data) {
  const members = Array.from(new Set(data));
  const uniform = members.length === 1 ? true : false;

  return { members, uniform };
}

function isInBorder(xPos, yPos, zPos, x, y, z) {
  if (y === 1 && z === 1) {
    if (xPos === 0 || xPos === x - 1) {
      return true;
    } else {
      return false;
    }
  }

  if (z === 1) {
    if (xPos === 0 || xPos === x - 1 || yPos === 0 || yPos === y - 1) {
      return true;
    } else {
      return false;
    }
  }

  if (
    xPos === 0 ||
    xPos === x - 1 ||
    yPos === 0 ||
    yPos === y - 1 ||
    zPos === 0 ||
    zPos === z - 1
  ) {
    return true;
  } else {
    return false;
  }
}

function getNeighbors(xPos, yPos, zPos, x, y, z) {
  const plan = x * y;
  const i = zPos * plan + yPos * x + xPos;
  const r = xPos + 1 < x ? i + 1 : undefined;
  const l = xPos - 1 >= 0 ? i - 1 : undefined;
  const u = yPos - 1 >= 0 ? i - x : undefined;
  const d = yPos + 1 < y ? i + x : undefined;
  const f = zPos + 1 < z ? i + plan : undefined;
  const b = zPos - 1 >= 0 ? i - plan : undefined;
  //
  const ur = u != undefined && r != undefined ? i - x + 1 : undefined;
  const ul = u != undefined && l != undefined ? i - x - 1 : undefined;
  const dr = d != undefined && r != undefined ? i + x + 1 : undefined;
  const dl = d != undefined && l != undefined ? i + x - 1 : undefined;
  //
  const fur = ur != undefined && f != undefined ? ur + plan : undefined;
  const ful = ul != undefined && f != undefined ? ul + plan : undefined;
  const fdr = dr != undefined && f != undefined ? dr + plan : undefined;
  const fdl = dl != undefined && f != undefined ? dl + plan : undefined;
  //
  const bur = ur != undefined && b != undefined ? ur - plan : undefined;
  const bul = ul != undefined && b != undefined ? ul - plan : undefined;
  const bdr = dr != undefined && b != undefined ? dr - plan : undefined;
  const bdl = dl != undefined && b != undefined ? dl - plan : undefined;
  //
  const fu = u != undefined && f != undefined ? u + plan : undefined;
  const fr = r != undefined && f != undefined ? r + plan : undefined;
  const fd = d != undefined && f != undefined ? d + plan : undefined;
  const fl = l != undefined && f != undefined ? l + plan : undefined;
  //
  const bu = u != undefined && b != undefined ? u - plan : undefined;
  const br = r != undefined && b != undefined ? r - plan : undefined;
  const bd = d != undefined && b != undefined ? d - plan : undefined;
  const bl = l != undefined && b != undefined ? l - plan : undefined;
  //

  return {
    r,
    l,
    u,
    d,
    f,
    b,
    ur,
    ul,
    dr,
    dl,
    fur,
    ful,
    fdr,
    fdl,
    bur,
    bul,
    bdr,
    bdl,
    fu,
    fr,
    fd,
    fl,
    bu,
    br,
    bd,
    bl,
  };
}

function closeNeighborsArrays({ r, l, u, d, f, b }) {
  return [r, l, u, d, f, b].filter((item) => item != undefined);
}

function crossNeighborsArrays({
  ur,
  ul,
  dr,
  dl,
  fur,
  ful,
  fdr,
  fdl,
  bur,
  bul,
  bdr,
  bdl,
  fu,
  fr,
  fd,
  fl,
  bu,
  br,
  bd,
  bl,
}) {
  return [
    ur,
    ul,
    dr,
    dl,
    fur,
    ful,
    fdr,
    fdl,
    bur,
    bul,
    bdr,
    bdl,
    fu,
    fr,
    fd,
    fl,
    bu,
    br,
    bd,
    bl,
  ].filter((item) => item != undefined);
}

function depict(i, dataShape) {
  const { x, y, z } = dataShape;
  let border, closeNeighbors, crossNeighbors, namedNeighbors, xPos, yPos, zPos;

  zPos = Math.floor(i / (x * y));
  const planI = i - zPos * x * y;
  yPos = Math.floor(planI / x);
  xPos = planI - yPos * x;
  border = isInBorder(xPos, yPos, zPos, x, y, z);
  namedNeighbors = getNeighbors(xPos, yPos, zPos, x, y, z);
  closeNeighbors = closeNeighborsArrays(namedNeighbors);
  crossNeighbors = crossNeighborsArrays(namedNeighbors);
  return {
    border,
    closeNeighbors,
    crossNeighbors,
    namedNeighbors,
    xPos,
    yPos,
    zPos,
  };
}

function isEqual(data1, data2) {
  if (data1.length !== data2.length) return false;
  for (let i = 0, len = data1.length; i < len; ++i) {
    if (data1[i] !== data2[i]) return false;
  }
  return true;
}

function findData(matchData, matchShape, data, dataShape, byChunk = false) {
  const { x: xm, y: ym, z: zm } = matchShape;
  const { x: xd, y: yd, z: zd } = dataShape;
  let matchArray = matchData.slice(0, xm);
  let zOffset = 0;
  for (let i = xm, len = matchData.length; i < len; i += xm) {
    if (i >= xm * ym) {
      zOffset += xm * ym;
      matchArray = [...matchArray, ...buildData(xd * yd - xm * ym, null)];
    }
    matchArray = [
      ...matchArray,
      ...buildData(xd - xm, null),
      ...matchData.slice(zOffset + i, zOffset + i + xm),
    ];
  }
  //
  const result = [];
  const matchLen = matchArray.length;
  const step = byChunk ? matchLen : 1;
  for (let j = 0, len = data.length; j <= len - matchLen; j += step) {
    let isEqual = true;
    for (let i = 0; i < matchLen; ++i) {
      if (matchArray[i] !== data[j + i]) {
        isEqual = false;
        break;
      }
    }
    if (isEqual) {
      result.push(j);
    }
  }

  return { result, matchArray };
}

function permute(data, validateFunc = (data) => true) {
  const len = data.length;
  if (len === 1) {
    const isValid = validateFunc(data);
    if (isValid === null) {
      return null;
    } else {
      return;
    }
  }
  for (let i = 0; i < len; ++i) {
    const p = [...data];
    p.splice(i, 1);
    p.unshift(data[i]);
    const isValid = validateFunc(p);
    if (isValid === true) {
      const newP = p.slice(1);
      if (permute(newP, validateFunc) === null) {
        return null;
      }
    } else if (isValid === null) {
      return null;
    }
  }
}

function iterate(data, chunkShape, dataShape, chunkFunc, overlap = true) {
  const { x: xc, y: yc, z: zc } = chunkShape;
  const { x: xd, y: yd, z: zd } = dataShape;
  const zStep = overlap ? 1 : zc;
  const yStep = overlap ? 1 : yc;
  const xStep = overlap ? 1 : xc;
  for (let z = 0; z <= zd - zc; z += zStep) {
    for (let y = 0; y <= yd - yc; y += yStep) {
      for (let x = 0; x <= xd - xc; x += xStep) {
        let pos = x + y * xd + z * xd * yd;
        let thisChunk = [];
        let thisMask = [];
        for (let k = 0; k < zc; ++k) {
          for (let j = 0; j < yc; ++j) {
            for (let i = 0; i < xc; ++i) {
              const index = i + j * xd + k * xd * yd;
              const thisData = data[pos + index];
              thisChunk.push(thisData);
              const maskLen = thisMask.length;
              if (index > maskLen) {
                thisMask = [...thisMask, ...buildData(index - maskLen, null)];
              }
              thisMask.push(thisData);
            }
          }
        }
        chunkFunc(thisChunk, thisMask, pos);
      }
    }
  }
}
//
// Result printer
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}
// kick-start-helpers webassembly module
// Automatically generated at Tue Jul 28 2020 00:26:10 GMT+0800 (Australian Western Standard Time)
const wasmString =
  "0,97,115,109,1,0,0,0,1,7,1,96,2,124,124,1,124,3,4,3,0,0,0,7,28,3,6,109,117,108,77,111,100,0,0,6,101,120,112,77,111,100,0,1,6,100,105,118,77,111,100,0,2,10,147,1,3,38,0,32,0,176,66,135,148,235,220,3,129,32,1,176,66,135,148,235,220,3,129,126,66,135,148,235,220,3,124,66,135,148,235,220,3,129,185,11,86,2,2,126,1,127,66,1,33,2,32,0,177,66,135,148,235,220,3,130,33,3,32,1,177,66,135,148,235,220,3,130,167,33,4,3,64,32,4,65,1,113,4,64,32,2,32,3,126,66,135,148,235,220,3,130,33,2,11,32,3,32,3,126,66,135,148,235,220,3,130,33,3,32,4,65,1,118,34,4,13,0,11,32,2,186,11,19,0,32,1,68,0,0,128,2,101,205,205,65,16,1,32,0,16,0,11";
const wasmCode = new Uint8Array(wasmString.split(","));
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod } = wasm.exports;

// Start
(async function main() {
  const [totalTests] = await readIntArray();
  //
  const sumArray = [];
  sumArray.length = 5000000;
  for (let testN = 1; testN <= totalTests; ++testN) {
    const [N] = await readIntArray();
    const data = (await readLine()).split("");
    //
    sumArray.fill(0, N);
    let sum = 0;
    let L = N - 1;
    for (let i = 0; i < N; ++i) {
      data[i] = parseInt(data[i], 10);
      sum += data[i];
      sumArray[i] = sum;
    }
    //
    let result = 0;
    let beauty = 0;
    let maxL = 0;
    let maxR = 0;
    for (let i = 0; i < N; ++i) {
      maxL = i >> 1;
      maxR = (L - i) >> 1;
      if (i - maxL > 0) {
        beauty = sumArray[maxR + i] - sumArray[i - maxL - 1];
      } else {
        beauty = sumArray[maxR + i];
      }
      //
      if (beauty > result) {
        result = beauty;
      }
    }

    printResult(testN, result);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
