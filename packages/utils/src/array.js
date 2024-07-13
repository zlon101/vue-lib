import { getType, isSame } from './object';

// 数组去重
export function unique(srcArr, noEmpty = false) {
  if (!Array.isArray(srcArr)) {
    return srcArr;
  }
  let result = [];
  if (getType(window.Set, 'function') && srcArr.every(item => !getType(item, 'Object'))) {
    result = [...new Set(srcArr)];
  } else {
    result = srcArr.filter((item, i) => srcArr.findIndex(child => isSame(item, child)) === i);
  }
  if (noEmpty) {
    result = result.filter(item => ![null, undefined, ''].includes(item));
  }
  return result;
}

/**
 * 数组交集
 * arrayIntersection(arr1, arr2)
 * @returns Array
 */
export function arrayIntersection(...arrWarp) {
  const minLen = Math.min(...arrWarp.map(item => item.length));
  const minIndex = arrWarp.findIndex(item => item.length === minLen);
  const allItems = unique(arrWarp[minIndex]);
  const dstArr = allItems.filter(item => arrWarp.every(arrWarpItem => arrWarpItem.includes(item)));
  return dstArr;
}

// 洗牌算法
export function confused(arr) {
  const N = (arr || []).length;
  if (N < 2) {
    return arr;
  }
  const shuffle = (arr) => {
    let n = arr.length;
    let random = -1;
    while (0 !== n) {
      // 无符号右移位运算符向下取整，或者改写成 random = Math.floor(Math.random() * n--)
      random = (Math.random() * n--) >>> 0;
      [arr[n], arr[random]] = [arr[random], arr[n]];
    }
    return arr;
  };
  return shuffle([...arr]);
}

// 打乱数组的顺序
export const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

// 数组平铺
export const flat = (arr) => arr.flat(Infinity);
