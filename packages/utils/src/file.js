/**
 * 根据base64计算图像存储大小
 * base64 是用四个字符来表示3个字节
 */
export const getSizeFromBase64 = (base64) => {
  // 把头部去掉
  let str = base64.replace(/data:image\/.+base64,/, '');
  // 找到等号，把等号也去掉
  const equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  // 原来的字符流大小，单位为字节
  const strLength = str.length;
  // 计算后得到的文件流大小，单位为字节
  const fileLength = Math.floor(strLength - (strLength / 8) * 2);
  // 由字节转换为MB
  const size = `${fileLength / 1024 ** 2}`;
  return `${size}MB`;
};

/**
 * 下载文件
 * val: Object|String
 * **/
export const downloadFile = (fileName, val) => {
  const fileContent = typeof val === 'object' ? JSON.stringify(val, null, 2) : val;

  const aTag = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  const URL = window.URL || window.webkitURL || window;
  aTag.href = URL.createObjectURL(new Blob([fileContent]));
  aTag.download = fileName;
  aTag.click();
};

export const ImgType = ['.png', '.jpg', '.jpeg', '.gif', '.tif', '.bmp', '.svg'];
export const VideoType = ['.mp4', '.mov', '.wmv', '.flv', '.avi', '.avchd', '.mkv', '.webm'];
export const AudioType = ['.mp3', '.aac', '.wav', '.flac', '.ape', '.alac', '.mkv', '.webm'];

export const isImage = fileExt => fileExt && ImgType.includes(fileExt.toLowerCase());
export const isVideo = fileExt => fileExt && VideoType.includes(fileExt.toLowerCase());
export const isAudio = fileExt => fileExt && AudioType.includes(fileExt.toLowerCase());

// base64 转换为blob格式
export const base64ToBlob = (base64, mimeType) => {
  const bytes = window.atob(base64.split('base64,')[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  const ia = [];
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([new Uint8Array(ia)], { type: mimeType });
};
