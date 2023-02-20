console.debug('执行 a.js');

export default function log () {
  return console.debug.apply(console, arguments);
}