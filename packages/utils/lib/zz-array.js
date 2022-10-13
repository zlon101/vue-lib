import { getObjectType, isExist, isSame } from './object.js';

// 数组去重
export function unique(srcArr, noEmpty = false) {
  if (!Array.isArray(srcArr)) {
    return srcArr;
  }
  let result = [];
  if (typeof window.Set === 'function' && srcArr.every(item => getObjectType(item) !== 'object')) {
    result = [...new Set(srcArr)];
  } else {
    result = srcArr.filter((item, i) => srcArr.findIndex(child => isSame(item, child)) === i);
  }
  if (noEmpty) {
    result = result.filter(item => ![null, undefined, ''].includes(item));
  }
  return result;
}

// 数组交集
// arrayIntersection(arr1, arr2)
export function arrayIntersection(...arrWarp) {
  let allItems = [];
  arrWarp.forEach(arrItem => {
    allItems = allItems.concat(arrItem);
  });
  allItems = unique(allItems);
  const dstArr = allItems.filter(item => arrWarp.every(arrWarpItem => arrWarpItem.includes(item)));
  return dstArr;
}
// 数组扁平化处理
export function flat(arr) {
  return arr.reduce((result, item) => result.concat(getObjectType(item) === 'array' ? flat(item) : item), []);
}

/**
 * 将扁平化数组转为树形结构
 * @param arr {Array} 需要转换的扁平化数组
 * @param config {Object} 配置项
 * @param config._id {String} 元素唯一标识的名称 默认为：id
 * @param config._pid {String} 元素父级唯一标识的名称 默认为：pid
 * @param config._child {String} 返回值中父元素存储子元素数组名称 默认为：pid
 * @returns {Error|Array}
 */

export function gradient(arr, { _id = 'id', _pid = 'pid', _child = 'children' } = {}) {
  if (arr.some(item => getObjectType(item) !== 'object')) return new Error('数组中的每一项必须为对象');
  function findChild(id) {
    return arr.filter(item => item[_pid] === id).map(item => ({ ...item, children: findChild(item[_id]) }));
  }
  return arr.filter(item => !arr.map(temp => temp[_id]).includes(item[_pid])).map(item => ({ ...item, [_child]: findChild(item[_id]) }));
}
/*
  filters对象采用键值对的形式传递过滤参数，例如:
  {
    name:'张',
    age:{
      min:18,
      max:24
    },
    address:['中国','四川','成都']
  }
  以上举例为filters的value可传递模式，
  1.字符串默认使用模糊匹配（见name)
  2.数字可限制范围，min和max可以只有其中一个(见age)
  3.具体的值可用数组进行包裹，代表匹配数组中任意一个即返回(见address)
  4.对象过滤内部使用JSON.stringify()判断，请注意兼容性
  5.其他情况使用===强制判断
 */
/**
 * 数组过滤方法
 * @param {array} arr 需要过滤的数组
 * @param {object} filters 过滤参数，
 * @param {string} logic 参数之间的逻辑关系，可选'and'和'or'
 * @returns {array}  返回过滤之后的数组
 */
export function filter(arr, filters, logic = 'and') {
  if (getObjectType(arr) !== 'array') return 'type error';
  function filterFn(item, key, value) {
    // 数组项没有对应的key
    if (item[key] === undefined) return false;
    // 过滤条件为object
    if (getObjectType(value) === 'object') {
      // 如果key对应的数组项为object
      if (getObjectType(item[key]) === 'object') {
        return JSON.stringify(item[key]) === JSON.stringify(value);
      }
      // 对数字类型，min，max做范围限制
      if (getObjectType(item[key]) === 'number' && (value.min !== undefined || value.max !== undefined)) {
        if (value.min !== undefined && value.max !== undefined) {
          return item[key] >= value.min && item[key] <= value.max;
        }
        if (value.min) return item[key] >= value.min;
        return item[key] <= value.max;
      }
    }
    // 过滤条件为数组
    if (getObjectType(value) === 'array') {
      if (getObjectType(item[key]) === 'array') {
        return value.some(v => item[key].includes(v));
      }
      return value.includes(item[key]) || value.length === 0;
    }
    // 文本过滤，采用模糊匹配
    if (getObjectType(item[key]) === 'string' && getObjectType(value) === 'string') {
      return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
    }
    return item[key] === value;
  }
  return arr.filter(item => {
    const keys = Object.keys(filters);
    if (logic === 'and') {
      return keys.every((key) => {
        const result = filterFn(item, key, filters[key]);
        return result;
      });
    } if (logic === 'or') {
      return keys.some(key => filterFn(item, key, filters[key]));
    }
    throw new Error('logic error。allow:and/or');
  });
}

/**
 * 数组合并
 * @param a {array} 数组a
 * @param b {array} 数组b
 * @returns {Error|array}
 */
export function merge(a, b) {
  if (getObjectType(a) !== getObjectType(b) || getObjectType(a) !== 'array') return new Error('type error。allow:array');
  const result = [...a];
  b.forEach((child) => {
    if (!isExist(child, a)) {
      result.push(child);
    }
  });
  return result;
}

/**
 * 多个数组求交集
 * @params 数组 用,分隔
 * @returns {*}
 */
export function intersect() {
  // eslint-disable-next-line prefer-rest-params
  const arrayList = [...arguments].sort((a, b) => a.length - b.length);
  const minArr = arrayList.pop();// 取出最短的数组，与每一项进行比较，减少比较次数
  return minArr.filter(item => arrayList.every(arr => arr.some(child => isSame(item, child))));
}
