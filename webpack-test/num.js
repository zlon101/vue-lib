export const CusMath = (() => {
  let result = 0;
  return {
    add: (a, b) => (result = a + b),
    subtract: a => result = result - a,
    get: () => result,
  }
})();



import { tmpPrint } from './tmp.js'
export function print () {
  tmpPrint()
  console.log('我是 num.js 的 print 方法')
}