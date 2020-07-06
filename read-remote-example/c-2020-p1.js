// Unfortunately loading from github does not work
// in online competition
const http = require("https");
const vm = require("vm");

function runModules(urls) {
  let loadedModules = 0;
  let resolveThePromise;
  const loadingPromise = new Promise((resolve, reject) => {
    resolveThePromise = () => {
      resolve(loadedModules);
    };
  });
  urls.forEach((url) => {
    http.get(url, (res) => {
      if (
        res.statusCode === 200 &&
        /^application\/javascript/.test(res.headers["content-type"])
      ) {
        let rawData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          vm.runInThisContext(rawData, url);
          ++loadedModules;
          if (loadedModules >= urls.length) {
            resolveThePromise();
          }
        });
      }
    });
  });
  return loadingPromise;
}

(async function main() {
  const readline = require("readline");

  await runModules([
    "https://makannew.github.io/kick-start-helpers/src/index.js",
  ]);
  syncWithConsole(readline);
  //
  const [T] = await ra();
  for (let testN = 1; testN <= T; ++testN) {
    const [N, K] = await ra();
    const data = await ra();
    parseAll(data);
    let matchData = [];
    for (let j = K; j > 0; --j) {
      matchData.push(j);
    }
    parseAll(matchData);
    const { totalMatch } = findData(
      matchData,
      buildShape(K),
      data,
      buildShape(data.length)
    );
    printResult(testN, totalMatch);
  }
  process.exit();
})();
