let inputBuffer = [];
let readIndex = 0;
let checkAvailableInput = () => null;
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
  ++readIndex;
  return new Promise((resolve, reject) => {
    checkAvailableInput = () => {
      if (readIndex <= inputBuffer.length) {
        resolve(inputBuffer[readIndex - 1]);
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

// helpers

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
// Result printer
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}

//
// Start
(async function main() {
  const [T] = await readIntArray();
  //
  for (let testN = 1; testN <= T; ++testN) {
    const [K] = await readIntArray();
    const data = await readIntArray();
    //
    let last;
    let tr = 0;
    let total = 0;
    for (let i = 0, len = data.length; i < len - 1; ++i) {
      let r = data[i + 1];
      let l = data[i];
      if (r !== l) {
        if (r > l) {
          if (tr < 0) {
            tr = 0;
          }
          ++tr;
        }
        //
        if (r < l) {
          if (tr > 0) {
            tr = 0;
          }
          --tr;
        }
        //

        //
        if (tr > 3 || tr < -3) {
          ++total;
          tr = 0;
        }
      }

      //
    }

    //
    printResult(testN, total);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
