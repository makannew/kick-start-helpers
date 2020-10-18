
/**
* Javacript boilerplate
* for Google kick start competition
*
* @link https://github.com/makannew/kick-start-helpers
*
* @author Makan Edrisi
*
* @ since 2020
* built at Tue Sep 29 2020 15:48:29 GMT+0800 (Australian Western Standard Time)
*/
let inputBuffer = [];
const nullFunc = () => null;
let checkAvailableInput = nullFunc;
const { count } = require("console");
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
// kick-start-helpers webassembly module
// Automatically generated at Tue Sep 29 2020 15:48:19 GMT+0800 (Australian Western Standard Time)
const wasmString = "0,97,115,109,1,0,0,0,1,7,1,96,2,124,124,1,124,3,5,4,0,0,0,0,7,37,4,6,109,117,108,77,111,100,0,0,6,101,120,112,77,111,100,0,1,6,100,105,118,77,111,100,0,2,6,105,110,116,68,105,118,0,3,10,158,1,4,38,0,32,0,176,66,135,148,235,220,3,129,32,1,176,66,135,148,235,220,3,129,126,66,135,148,235,220,3,124,66,135,148,235,220,3,129,185,11,86,2,2,126,1,127,66,1,33,2,32,0,177,66,135,148,235,220,3,130,33,3,32,1,177,66,135,148,235,220,3,130,167,33,4,3,64,32,4,65,1,113,4,64,32,2,32,3,126,66,135,148,235,220,3,130,33,2,11,32,3,32,3,126,66,135,148,235,220,3,130,33,3,32,4,65,1,118,34,4,13,0,11,32,2,186,11,19,0,32,1,68,0,0,128,2,101,205,205,65,16,1,32,0,16,0,11,10,0,32,0,176,32,1,176,127,186,11"
const wasmCode = new Uint8Array(wasmString.split(","));
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod, intDiv } = wasm.exports;
//
// Start
//
(async function main() {
  const [T] = await readIntArray();

  for (let testN = 1; testN <= T; ++testN) {
    const A=[]
    const [R,C] = await readIntArray();
    for (let i=0;i<R;++i){
      const B = await readIntArray();
      A[i]=B
    }
    //
    let diff = 0
    if (R<=2 || C<=2){
      diff = 0
      printResult(testN, diff);
      continue
    }

    for (let h=1;h<1001;++h){
      const [S,count]= getSlice(h)
      if (count>3){
        paintInward(S)
        diff+=fillDiff(S,h)
        // console.log("diff=",diff)
        // for(let i=0;i<R;++i){
        //   let p=""
        //   for (let j=0;j<C;++j){
        //     let l=""
        //     if (S[i*C+j]===null){
        //       l="null "
        //       process.stdout.write("\x1b[33mnull  \x1b[89m")
        //     }
        //     if (S[i*C+j]===false){
        //       l="false "
        //       process.stdout.write("\x1b[31mfalse \x1b[89m")
        //     }
        //     if (S[i*C+j]===true){
        //       l="true "
        //       process.stdout.write("\x1b[32mtrue  \x1b[89m")
        //     }
        //     p+=" "+l
        //   }
        //                 process.stdout.write("\x1b[37m\n\x1b[89m")
        // }

      }else{
        break
      }
    }
    //




    printResult(testN, diff);
    // functions
    function fillDiff(S,h){
      let diff=0
      for (let i=1;i<R-1;++i){
        for (let j=1;j<C-1;++j){
          if (S[i*C+j]===false && A[i][j]<h){
            diff+=h-A[i][j]
            A[i][j]=h
          }
        }

      }
      return diff
    }

    //
    function paintInward(S){
      // paint first and last row
      const lastRow = (R-1)*C
      for (let i=0;i<C;++i){
        if (S[i]===false){
          S[i]=null
        }
        if (S[i+lastRow]===false){
          S[i+lastRow]=null
        }
      }
      // paint first and last col
      for (let i=0;i<R;++i){
        if (S[i*C]===false){
          S[i*C]=null
        }
        if (S[i*C+C-1]===false){
          S[i*C+C-1]=null
        }
      }
      //
      let thereIsNewCase
      do{
        thereIsNewCase=false
        for (let i=1;i<R-1;++i){
          for(let j=1;j<C-1;++j){
            if(S[i*C+j]===false){
              if (S[((i+1)*C)+j]===null || S[((i-1)*C)+j]===null || S[i*C+j+1]===null || S[i*C+j-1]===null) {
                S[i*C+j]=null
                thereIsNewCase=true
              }
            }
          }
        }
      }while(thereIsNewCase)


    }
    //
    function getSlice(h){
      const S=[]
      S.length=R*C;
      S.fill(false)
      let count=0
      for (let i=0;i<R;++i){
        for (let j=0;j<C;++j){
          if (A[i][j]>=h){
            S[i*C+j]=true
            ++count
          }
        }
      }
    return [S,count]
    }


  }
  process.exit();
})().catch((err) => console.log(err));
//
//
function printResult(testN, result) {
  console.log(`Case #${testN}: ${result}`);
}
