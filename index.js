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

function buildShape(x, y = 0, z = 0) {
  return { x, y, z };
}

function analyze(data) {
  const members = Array.from(new Set(data));
  const uniform = members.length === 1 ? true : false;

  return { members, uniform };
}

function mergeData(model, data, func) {
  for (let i = 0, len = model.length; i < len; ++i) {
    model[i] = func(model[i], data[i], i);
  }
}

function isInBorder(xPos, yPos, zPos, x, y, z) {
  if (y === 0 && z === 0) {
    if (xPos === 0 || xPos === x - 1) {
      return true;
    } else {
      return false;
    }
  }

  if (z === 0) {
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

function depict(i, { x, y, z }) {
  let border, closeNeighbors, crossNeighbors, namedNeighbors, xPos, yPos, zPos;

  zPos = y != 0 ? Math.floor(i / (x * y)) : 0;
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

function findData(matchData, matchShape, data, dataShape) {
  const { x: xm, y: ym = 0, z: zm = 0 } = matchShape;
  const { x: xd, y: yd = 0, z: zd = 0 } = dataShape;
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
  const result = buildData(data.length, null);
  const matchLen = matchArray.length;
  let index = 0;
  let totalMatch = 0;
  for (let i = 0, len = data.length; i < len; ++i) {
    if (data[i] === matchArray[index] || matchArray[index] === null) {
      ++index;
    } else {
      index = 0;
    }
    if (index === matchLen) {
      ++totalMatch;
      for (let j = 0; j < matchLen; ++j) {
        result[i - matchLen + 1 + j] = matchArray[j];
      }
      index = 0;
    }
  }

  return { result, totalMatch };
}

function parseAll(data) {
  for (let i in data) {
    data[i] = parseInt(data[i], 10);
  }
}

function testFunc() {
  return "hello from module";
}

module.exports = testFunc;

console.log("index.js called");
