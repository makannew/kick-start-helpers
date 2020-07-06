(async function main() {
  const [T] = await ra();

  for (let testN = 1; testN <= T; ++testN) {
    // Here is solution for test

    printResult(testN, totalMatch);
  }
  process.exit();
})().catch((err) => console.log(err));
