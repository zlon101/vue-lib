
// 生成随机字符
export const randomString = (len) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

// 生成指定范围内的随机数
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
