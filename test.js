// const localeSrc = "https://makannew.github.io/kick-start-helpers/index.js";
// const http = require("http");
// const vm = require("vm");
// const concat = require("concat-stream");
// http.get(
//   localeSrc,
//   (res) => {
//     res.setEncoding("utf8");
//     res.pipe(
//       concat({ encoding: "string" }, (remoteSrc) => {
//         let context = {};
//         const script = new vm.Script(remoteSrc);
//         script.runInNewContext(context);
//         console.log(context);
//       })
//     );
//   },
//   (err) => {
//     console.log("err", err);
//   }
// );
// console.log(testFunc());

const http = require("https"),
  vm = require("vm");

["https://makannew.github.io/kick-start-helpers/index.js"].forEach((url) => {
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
      });
    }
  });
});
