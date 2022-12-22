import { getType, isSame } from './object';

// 数组去重
export function unique(srcArr, noEmpty = false) {
  if (!Array.isArray(srcArr)) {
    return srcArr;
  }
  let result = [];
  if (typeof window.Set === 'function' && srcArr.every(item => getType(item) !== 'object')) {
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
