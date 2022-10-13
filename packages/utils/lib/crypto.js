import cryptoJs from 'crypto-js';
const __sdpRandomStringReadableAlphaNum = '23456789abcdefghjkmnpqrstuvwxyz';
const gDefaultPsk = 'pzsh65rp8v';

// crypto-js4.0版本在ie11上有兼容性问题

export function RandomString(size) {
  let text = '';
  const possible = __sdpRandomStringReadableAlphaNum;
  if (window && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(size * 2);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < size; i++) {
      let thisNum = array[2 * i] * 256 + array[2 * i + 1];
      text += possible.charAt(thisNum % possible.length);
    }
    return text;
  } else {
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

export function EncryptAESStr(msg, key) {
  if (!key) {
    key = gDefaultPsk;
  }
  const enc = cryptoJs.AES.encrypt(msg, key).toString();
  const res = cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(enc));
  return res;
}

export function DecryptAesStr(msg, key) {
  if (!key) {
    key = gDefaultPsk;
  }
  const decData = cryptoJs.enc.Base64.parse(msg).toString(cryptoJs.enc.Utf8);
  const res = cryptoJs.AES.decrypt(decData, key).toString(cryptoJs.enc.Utf8);
  return res;
}
