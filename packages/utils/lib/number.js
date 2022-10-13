export function GbFromFloat(byteNum) {
  if (byteNum >= 1e15 || byteNum <= -1e15) {
    return Number.parseFloat(byteNum / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'PB';
  }
  if (byteNum >= 1e12 || byteNum <= -1e12) {
    return Number.parseFloat(byteNum / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB';
  }
  if (byteNum >= 1e9 || byteNum <= -1e9) {
    return Number.parseFloat(byteNum / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
  if (byteNum >= 1e6 || byteNum <= -1e6) {
    return Number.parseFloat(byteNum / (1024 * 1024)).toFixed(2) + 'MB';
  }
  if (byteNum >= 1e3 || byteNum <= -1e3) {
    return Number.parseFloat(byteNum / (1024)).toFixed(2) + 'KB';
  }
  return Number.parseFloat(byteNum).toFixed(2) + 'B';
}
