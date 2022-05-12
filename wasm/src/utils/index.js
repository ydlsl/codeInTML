const testWasm = import('./test.js')

let testWasmInstance = {}

export function getTest(value, len){
  if(testWasmInstance.default){
    return testWasmInstance.default.test(value, len)
  }
  return value
}

export function loadTest() {
  return new Promise(async resolve=>{
    testWasmInstance = await testWasm;
    testWasmInstance.default.onRuntimeInitialized = () => {
      resolve();
    };
  })
}