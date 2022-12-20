import { EncryptAESStr, DecryptAesStr } from './crypto.js';
/**
 * 存储
 */
export function setStorage(key, value) {
  if (!key.trim()) { return; }

  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}
/**
 * 获取
 */
export function getStorage(key) {
  if (!key.trim()) { return; }
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
/**
 * 加密存储
 */
export function setStorageCrypto(key, value) {
  try {
    if (!key.trim()) { return; }
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, EncryptAESStr(value));
    // window.localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
    removeStorage(key);
    window.location.reload();
  }
}
/**
 * 获取加密数据
 */
export function getStorageCrypto(key) {
  try {
    if (!key.trim()) { return; }
    const value = window.localStorage.getItem(key);
    if (!value) { return ''; }
    const res = DecryptAesStr(value);
    try {
      return JSON.parse(res);
    } catch (e) {
      return res;
    }
  } catch (error) {
    console.error(error);
    removeStorage(key);
    window.location.reload();
  }
}
/**
 * 删除
 */
export function removeStorage(key) {
  if (!key) { return; }
  window.localStorage.removeItem(key);
}
