import { log, person, count, getCount, setCount } from './a.js';
import './b.js';

// log(`count 初始值: ${count}`);
// log('setCount', setCount());
// log(`主模块中的 count: ${count}`);
// log(`getCount: ${getCount()}`);

log('index.js 执行 ', person.name)

person.name = 'xxx';
