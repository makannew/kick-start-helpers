function combinations(data) {
  if (data.length === 1) {
    return [data[0]];
  }
  let result = [];
  for (let i = 0, lenI = data.length; i < lenI; ++i) {
    let otherItems = [...data];
    otherItems.splice(i, 1);
    const otherLen = otherItems.length;
    const otherComb = combinations(otherItems);
    for (let j = 0, lenJ = otherComb.length; j < lenJ; j += otherLen) {
      result = [...result, data[i], ...otherComb.slice(j, j + otherLen)];
    }
  }
  return result;
}

const data = ["a", "b", "c"];

console.log(combinations(data));
