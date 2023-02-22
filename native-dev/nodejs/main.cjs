const { num, getNum, setNum } = require('./a.cjs');

const log = console.debug.bind(console);

log(`num 初始值: ${num}`);
log('setNum', setNum());
log(`主模块中的 num: ${num}`);
log(`getNum: ${getNum()}`);