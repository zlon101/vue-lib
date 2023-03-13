const members = ['张三', '李四', '王五'];

const kids = ['小明', '小红', '小亮'];

const log = console.debug;
const getRandom = (start, end) => Math.floor(Math.random() * end) + start;

const getMember = () => members[getRandom(0, members.length - 1)];
const getKid = () => kids[getRandom(0, kids.length - 1)];

export { members, kids, getMember, getKid, log };
