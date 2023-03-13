const members = ['张三', '李四', '王五'];

const log = console.debug;
const getRandom = (start, end) => Math.floor(Math.random() * end) + start;

const getMember = () => members[getRandom(0, members.length - 1)];

log('tst');

const getName = () => console.log(`My name is ${getMember()}`);

export { getName as default };
