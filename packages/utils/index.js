/**
 * 复制文字
 */
export const copyString = (str) => {
  if (document.execCommand) {
    const input = document.createElement('textarea');
    input.readOnly = 'readonly';
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    input.value = str;
    document.body.appendChild(input);
    input.select();
    const isSuccess = document.execCommand('copy');
    document.body.removeChild(input);
    return isSuccess;
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
    return true;
  }
  return false;
};

// 深度克隆
export function deepClone(srcData, hash = new WeakMap()) {
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
}

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
