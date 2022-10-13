#!/usr/bin/env node

const fs = require('fs');
const { Log, LogErr, getAbsPath, editPackage } = require('./util.js');

/**
 * 修改指定目录下组件的 package.json 中 name 和 publishConfig 字段
 * 输入的目录以项目根路径为参考
 * npm run edit:pkg packages/basecmp name=@zl/button version=1.0.0
*/
const args = process.argv.slice(2);
const cmpDir = args[0];
if (!cmpDir) {
  Log('请输入组件目录及参数, 如: npm run edit:pkg packages/basecmp name=@zl/xx version=1.0.0');
  process.exit(1);
}
let fieldMap = {};
if (args.length > 1) {
  fieldMap = args.slice(1).reduce((acc, item) => {
    const [k, val] = item.split('=');
    acc[k] = val;
    return acc;
  }, {});
}
Log('=== 编辑 package.json 开始 ===');
fixCmpPackage(cmpDir, fieldMap);
Log('=== 编辑 package.json 结束 ===');

// =================================================================
function fixCmpPackage(targetDir, fieldMap) {
  try {
    // const cmpDirList = await readdir(targetDir);
    const cmpDirList = fs.readdirSync(targetDir);
    for (const cmpDir of cmpDirList) {
      // Log(cmpDir);
      const absPath = `${targetDir}/${cmpDir}`;
      // Log(absPath);
      if (fs.lstatSync(absPath).isDirectory() && !/^\./.test(cmpDir)) {
        const fileList = fs.readdirSync(getAbsPath(__dirname, '../', absPath));
        if (!fileList.includes('package.json') > 0) {
          LogErr(`${absPath} 没有 package.json`);
        } else {
          const filePath = getAbsPath(__dirname, `../${absPath}/package.json`);
          editPackage(filePath, fieldMap);
        }
        // Log(fileList);
      }
    }
  } catch (err) {
    LogErr('getFiles失败');
  }
}
