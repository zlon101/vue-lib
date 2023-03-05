/* 随机数 */
export function getRandom(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArray(N) {
  const arr = new Array(N).fill('');
  arr.forEach((_, ind) => {
    arr[ind] = getRandom(0, 9);
  });
  return arr;
}

const hasSymbol = typeof Symbol === 'function';
// 生成唯一id
export const getUniqueId = () => {
  return hasSymbol ? Symbol() : String(Math.random()).slice(-8) + String(Date.now()).slice(-4);
};

/** 统计

 const N = 100000000;
 console.log('start 0');
 const arr = getRandomArray(N);
 const obj = {};
 console.log('start 1');
 arr.forEach(v => {
  if (obj[v]) {
    obj[v] += 1;
  } else {
    obj[v] = 1;
  }
});
 console.log('start 2');
 Object.keys(obj).forEach(k => {
  obj[k] = (obj[k] / N).toFixed(4);
})
 console.log(obj);


 getRandomArray(6).join('');
 **/

/**
 function aaa() {
  return new Promise((resolve, reject) => {
    console.debug(0);
    setTimeout(() => {
      console.debug(1);
      reject();
      console.debug(2);
    }, 10000);
  });
}
 aaa();
 **/

/**
 * 转换存储大小
 * numberOfBytes: 字节（B）
 * *************/
export function transformByteUnit(numberOfBytes) {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const exponent = Math.min(Math.floor(Math.log(numberOfBytes) / Math.log(1024)), units.length - 1);
  const approx = numberOfBytes / 1024 ** exponent;
  const output = exponent === 0 ? `${numberOfBytes} B` : `${approx.toFixed(3)} ${units[exponent]}`;
  console.debug(output);
  return output;
}
