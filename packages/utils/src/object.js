/**
 * 是否为空对象
 */
export const isEmptyObj = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

/**
 * 获取某个数据的类型
 * @param value
 * @returns {string} 对应类型名称
 */
export const getObjectType = (value) => {
  const str = Object.prototype.toString.call(value);
  return str.slice(8, -1).toLowerCase();
};

/**
 * 检测a，b两个值是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
export const isSame = (a, b) => {
  if (getObjectType(a) !== getObjectType(b)) return false;
  const type = getObjectType(a);
  if (type === 'object') {
    return Object.keys(a).every(key => isSame(a[key], b[key]));
  }
  if (type === 'array') {
    return a.every((item) => b.some(temp => isSame(item, temp)));
  }
  return a === b;
};

export const deepClone = (srcData, hash = new WeakMap()) => {
  if (srcData === null || typeof srcData !== 'object') {
    return srcData;
  }
  if (srcData instanceof Date) return new Date(srcData);
  if (srcData instanceof RegExp) return new RegExp(srcData);
  if (hash.get(srcData)) {
    return hash.get(srcData);
  }

  const newData = new srcData.constructor();
  hash.set(srcData, newData);
  const keys = [...Object.keys(srcData), ...Object.getOwnPropertySymbols(srcData)];
  keys.forEach(k => {
    newData[k] = deepClone(srcData[k], hash);
  });
  return newData;
};

/**
 * 检测某个值是否存在于某个指定的范围中
 * @param value {any} 被检测的值
 * @param source {any} 被检测的范围
 * @returns {Error|boolean}
 */
export function isExist(value, source) {
  const sourceType = getObjectType(source);
  if (sourceType !== 'array' && sourceType !== 'object') {
    return new Error('type error。allow:array/object');
  }
  const valueType = getObjectType(value);
  if (valueType === 'object') {
    if (sourceType === 'array') {
      return source.some(item => getObjectType(item) === 'object' && isSame(value, item));
    }
    if (sourceType === 'object') {
      return Object.keys(source).some(key => isSame(value, source[key]));
    }
    return false;
  }
  if (valueType === 'array') {
    if (sourceType === 'array') {
      return source.some(item => getObjectType(item) === 'array' && item.length === value.length && isSame(value, item));
    }
    if (sourceType === 'object') {
      return Object.key(source).some(key => isSame(value, source[key]));
    }
    return false;
  }
  if (sourceType === 'array' || (valueType === 'string' && sourceType === 'string')) {
    return source.includes(value);
  }
  return false;
}

/**
 * 对象覆盖
 * @param value {any} 旧值
 * @param newValue {any} 新值
 * @returns {any}
 */
export function cover(value, newValue) {
  if (getObjectType(value) !== getObjectType(newValue)) {
    return newValue;
  }
  let result = getDefaultValue(value);
  const type = getObjectType(value);
  switch (type) {
    case 'boolean':
    case 'number':
    case 'null':
    case 'undefined':
    case 'string':
    case 'function':
    case 'regexp': {
      result = newValue;
      break;
    }
    case 'array': {
      result = value;
      newValue.forEach((child, i) => {
        result[i] = cover(result[i], child);
      });
      break;
    }
    case 'object': {
      result = value;
      const ak = Object.keys(value);
      Object.keys(newValue).forEach(key => {
        result[key] = ak.includes(key) ? cover(value[key], newValue[key]) : newValue[key];
      });
      break;
    }
    default: result = newValue;
  }
  return result;
}

/**
 * 获取某个值得默认值
 * @param value 指定的值
 * @returns {*} 值对应类型的默认值
 */
export function getDefaultValue(value) {
  const defaultValue = {
    boolean: false,
    number: 0,
    null: null,
    undefined,
    string: '',
    array: [],
    map: new Map(),
    object: {},
    function: () => {},
    regexp: new RegExp(''),
  };
  const type = getObjectType(value);
  return defaultValue[type];
}
