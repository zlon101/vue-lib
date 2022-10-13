const fs = require('fs');
const path = require('path');

const resolvePath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();

const LessFiles = ['global.less'];
const AllClsNames = [];
const ClsNameReg = /^\.(\w.*){/gm;
const NoteReg = /}$/gm;

for (const file of LessFiles) {
  const filePath = resolvePath(`../${file}`);
  const clsNames = handleFile(filePath);
  AllClsNames.push(...clsNames);
}
const noteFilePath = resolvePath('../example/note.json');
const noteContent = JSON.stringify(AllClsNames, null, 2);
fs.writeFile(noteFilePath, noteContent, err => {
  const rePath = noteFilePath.split('src/').pop();
  console.log(`\n${err ? '❌' : '✅' } 生成${rePath}${err ? '失败' : '成功'}`);
});

// ========================================

function handleFile(lessFile) {
  const str = fs.readFileSync(lessFile, 'utf-8');

  ClsNameReg.lastIndex = 0;
  NoteReg.lastIndex = 0;

  let lastEnd = 0, startInd = 0;
  let clsRes = null;
  let clsNames = [];
  while (clsRes = ClsNameReg.exec(str)) {
    let clsName = clsRes[1];
    startInd = clsRes.index;

    // console.log(startInd, str[clsRes.index]);
    NoteReg.lastIndex = lastEnd;

    let noteRes = null;
    const segment = str.slice(0, startInd);
    while (noteRes = NoteReg.exec(segment)) {
      lastEnd = NoteReg.lastIndex;
    }
    let note = str.slice(lastEnd, startInd).replace(/^\n+/, '').trim();
    note = note.replace(/^(\/\/)|(\/\*)/g, '').replace(/\*\/$/g, '');
    clsNames.push({clsName, note});
    // note && console.log(`\n$==${note}===$`);
  }
  return clsNames;
}
