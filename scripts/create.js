#!/usr/bin/env node

const fs = require('fs');
const { Log, getAbsPath, editPackage } = require('./util');
const child_process = require('child_process');

const args = process.argv.splice(2);
const newCmpDir = args[0];
const newCmpName = args[1];

/**
 * 创建组件
 * args[0]: 新组件所在目录，以项目根路径为参考
 * args[1]: 新组件名
 */
if (!newCmpDir || !newCmpName) {
  Log('参数错误, 预期命令如: node create.js ./packages/basecmp  input');
  process.exit(1);
}

const templatePath = getAbsPath(__dirname, '../packages/template');
const newCmpAbsDir = getAbsPath(__dirname, '../', newCmpDir);

const dirList = fs.readdirSync(newCmpAbsDir);
const idx = dirList.indexOf(newCmpName);

if (idx !== -1 && fs.lstatSync(`${newCmpAbsDir}/${newCmpName}`).isDirectory()) {
  Log('文件名已经存在');
  process.exit(1);
}

const targetDir = `${newCmpAbsDir}/${newCmpName}`;
child_process.spawnSync('cp', ['-r', templatePath, targetDir]);

const fieldMap = {
  name: newCmpName.toLowerCase(),
};
editPackage(`${targetDir}/package.json`, fieldMap);
Log('End!');
