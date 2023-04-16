import { log, person } from './a.js';

log('b.js 执行 ', person.name);


setTimeout(() => {
  log('b.js setTimeout: ', person.name)
}, 5000)
