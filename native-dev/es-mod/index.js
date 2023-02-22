import { count, getCount, setCount } from './a.js';

const log = console.debug.bind(console);

log(`count 初始值: ${count}`);
log('setCount', setCount());
log(`主模块中的 count: ${count}`);
log(`getCount: ${getCount()}`);