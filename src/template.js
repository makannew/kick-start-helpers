//
// Start
//
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    printResult(testN, order);
    // functions
  }
  process.exit();
})().catch((err) => console.log(err));
//
//
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}
