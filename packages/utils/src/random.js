
// 生成随机字符
export const randomString = (len, cfg = {onlyNumber: false, speical: true}) => {
  const Alphabet = 'ABCDEFGHJKLMNPQRSTVWXYZabcdefghijkmnpqrstuvwxyz';
  const Nums = '1234567890';
  const Speic = '!@#$%^&_?<>';
  const sets = cfg.onlyNumber ? Nums : (cfg.speical ? Alphabet.concat(Nums, Speic) : Alphabet.concat(Nums));
  const strLen = sets.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += sets.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};
/**测试代码
const N = 1000000;
const arr = new Array(N);
for (let i = 0; i < N; ++i) {
  arr[i] = randomString(1);
}

const map = new Map();
arr.forEach(c => {
  map.set(c, map.has(c) ? (map.get(c) + 1) : 1);
});
const res = new Array(map.size);
let j = 0;
for(let [c, count] of map.entries()) {
  res[j++] = [c, (count/N).toFixed(2)];
}
console.table(res);
***/

// 生成指定范围内的随机数
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
