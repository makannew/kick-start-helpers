const http = require("https");
const vm = require("vm");

async function runModules(urls) {
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
    "https://makannew.github.io/kick-start-helpers/index.js",
    "https://makannew.github.io/kick-start-boilerplate/src/index.js",
  ]);
  const { inputBuffer, readIndex } = syncWithConsole(readline);
  console.log(testFunc());
})().catch((err) => console.log(err));
