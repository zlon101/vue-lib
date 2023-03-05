// html 字符转义
const HtmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  // eslint-disable-next-line
  "'": '&#x27;',
  '`': '&#x60;',
};

// 针对普通文本的编码
export function xssH(s) {
  s += '';
  if (/(?:&|<|>|"|'|`)/.test(s) === false) {
    return s;
  }
  return s.replace(/(?:&|<|>|"|'|`)/g, match => HtmlEscapes[match]);
}

// 针对url里面query key，value的编码
export function xssUrlv(s) {
  // eslint-disable-next-line
  return encodeURIComponent(s).replace("'", '%27');
}
