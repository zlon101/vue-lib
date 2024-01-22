/* eslint-disable */

export default function log1(...args) {
  if (args.length === 0) {
    console.log('\n');
    return;
  }
  // if (args.length === 1) {
  //   console.log(args[0]);
  //   return;
  // }
  const optObj = {};
  const optObjeKMap = {
    string: 'css',
    boolean: 'br',
    number: 'indent',
  };

  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'object' && Array.isArray(lastArg.opt)) {
    lastArg.opt.forEach(optV => {
      const optType = typeof optV;
      optObjeKMap[optType] && (optObj[optObjeKMap[optType]] = optV);
    });
    args = args.slice(0, -1);
  }
  const _opt = Object.assign({
    br: true, indent: 0, css: '#00ffdd',
  }, optObj);
  if (_opt.br) {
    console.log('\n');
  }

  const indent = new Array(_opt.indent).fill(' ').join('');
  const output = [...args];
  if (typeof args[0] === 'string') {
    output.shift();
    output.unshift(`%c${indent + args[0]}`, `color:${_opt.css}`);
  }
}

export const log = (label, data, type = 'debug') => {
  const Color = {
    info: 'color: #fff',
    debug: 'color: #0af4f4',
    warn: 'color: #f4f40a',
    error: 'color: red'
  }
  const msg = ['undefined', 'object'].includes(typeof data) ? JSON.stringify(data, null, 2) : data;
  if (data === undefined) {
    console.debug(`\n%c${label}`, Color[type]);
  } else {
    console.debug(`\n%c${label}:\n ${msg}`, Color[type]);
  }
};
