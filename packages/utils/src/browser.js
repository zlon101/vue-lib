// 是否是移动端
export const isMobile = () => {
  return !!navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  );
};


// 是否是 Android
export const isAndroid = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
};

// 是否是 IOS
export const isIOS = () => {
  let reg = /iPhone|iPad|iPod|iOS|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
};
