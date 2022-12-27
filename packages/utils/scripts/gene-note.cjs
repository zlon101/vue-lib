const fs = require('fs');
const path = require('path');

const resolvePath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();

const LibDir = '../src';
const IgnoreFile = ['popper.js'];
const LibPath = resolvePath(LibDir);
const list = fs.readdirSync(LibPath);
const AllFn = [];

// index.js
AllFn.push({
  subpath: 'index',
  fnArr: handleFile(resolvePath('../index.js')),
});
for (const file of list) {
  if (IgnoreFile.includes(file)) continue;

  const filePath = `${LibPath}/${file}`;
  let subpath = '';
  if (isDir(filePath)) {
    // 只读取嵌套目录中的 index.js 文件
    const innerList = fs.readdirSync(filePath);
    if (innerList.includes('index.js')) {
      subpath = filePath.split('/').pop();
      const fnArr = handleFile(`${filePath}/index.js`);
      AllFn.push({ subpath, fnArr });
    }
  } else if (filePath.endsWith('.js')) {
    subpath = filePath.split('/').pop().split('.')[0];
    const fnArr = handleFile(filePath);
    AllFn.push({ subpath, fnArr });
  }
}

const noteFilePath = resolvePath('../example/note.json');
fs.writeFile(noteFilePath, JSON.stringify(AllFn, null, 2), err => {
  const rePath = noteFilePath.split('src/').pop();
  console.log(`\n${err ? '❌' : '✅' } 生成${rePath}${err ? '失败' : '成功'}`);
});

// ========================================
function handleFile(jsFile) {
  const str = fs.readFileSync(jsFile, 'utf-8').trim().replace(/(^\n+|\n+$)/g, '');
  const exportMatch = [...str.matchAll(/^export/gm)];
  let startInd = 0, exportInd = 0;
  const matchRes = /^(\/\/|\/\*)/m.exec(str);
  matchRes && (startInd = matchRes.index);

  const fnList = [];
  exportMatch.forEach(item => {
    exportInd = item.index;
    // 函数签名
    const resetStr = str.slice(exportInd);
    let fnName = resetStr.split('\n')[0].trim();
    // console.log(`\n$ fnName: ${fnName}`);
    let nameEnd = 0;
    if (fnName.includes('class')) {
      fnName = fnName.split('{')[0];
    } else if (fnName.includes('({')) {
      nameEnd = resetStr.indexOf('})') + exportInd + 1;
      fnName = str.slice(exportInd, nameEnd);
    } else if (fnName.includes('(')) {
      nameEnd = resetStr.indexOf(')') + exportInd + 1;
      fnName = str.slice(exportInd, nameEnd);
    } else if (fnName.includes('=>')) {
      // 箭头函数
      fnName = fnName.split('{')[0];
    } else {
      // 常量
      if (fnName.includes('{')) {
        nameEnd = resetStr.indexOf('}') + exportInd + 1;
        fnName = str.slice(exportInd, nameEnd);
      } else if (fnName.includes('[')) {
        nameEnd = resetStr.indexOf(']') + exportInd + 1;
        fnName = str.slice(exportInd, nameEnd);
      }
    }

    // 函数注释
    let note = '';
    let matchAllRes = [...str.slice(startInd, exportInd).matchAll(/\n};*\n+/g)];
    if (matchAllRes.length > 0) {
      const lastSearch = matchAllRes.pop();
      matchAllRes = null;
      startInd += (lastSearch.index + lastSearch[0].length);
    }

    if (startInd > exportInd) {
      note = '';
    } else {
      note = str.slice(startInd, exportInd).replace(/\n{2,}/, '\n');
    }
    fnList.push({
      fnName: fnName.trim(),
      note: note.trim(),
    });

    // 函数结尾
    let fnEndRes = null;
    if (fnName.includes('{')) {
      fnEndRes = /\n+};*\n+/.exec(resetStr);
    } else if (fnName.includes('[')) {
      fnEndRes = /\n+];*\n+/.exec(resetStr);
    }
    if(fnEndRes) {
      startInd = fnEndRes.index + fnEndRes[0].length + exportInd;
    } else {
      const index2 = resetStr.indexOf('\n');
      if (index2 !== -1) {
        startInd = exportInd + index2 + 1;
      } else {
        startInd = str.length - 1;
      }
    }
    // console.log(`fn:\n${fnName}`);
    // console.log(`\nnote:\n${note}`);
  });
  return fnList;
}
