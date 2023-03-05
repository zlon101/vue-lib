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

/**
 * 平铺嵌套数组
 * tileArray([ 1, ['b', 'c'], ['d', 'e'], [2, [4, [7]]] ])
 * **/
export function tileArray(arr) {
  function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        yield* iterTree(tree[i]);
      }
    } else {
      yield tree;
    }
  }
  return [...iterTree(arr)];
}
