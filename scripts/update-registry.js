#!/usr/bin/env node

/**
 * 批量发布组件
 * 批量删除私有源上的组件
*/

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { CmpPrdfix } = require('./cfg.js');
const { Log, LogErr } = require('./util');

const getAbsPath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();

const args = process.argv.slice(2);
const paramObj = args.reduce((acc, item) => {
  const [k, val] = item.split('=');
  acc[k] = val;
  return acc;
}, {});
const targetDir = paramObj.dir && path.join(__dirname, '../', paramObj.dir);
const exetype = paramObj.type;
if (!targetDir || !exetype) {
  LogErr('请输入参数，如: npm run update:registry dir=packages/basecmp type=<publish|unpublish>');
  process.exit(1);
}

const WhiteDirs = ['node_modules']; // 跳过的目录
if (['publish', 'unpublish'].includes(exetype)) {
  traverseDir(targetDir);
}

// 遍历目录
function traverseDir(dir) {
  if (WhiteDirs.some(item => dir.includes(item))) {
    return;
  }
  const dirAbs = getAbsPath(dir);
  fs.readdir(dirAbs, (err, list) => {
    if (err) {
      console.log(`❌ readdir ${dirAbs.split('packages/').pop()}`);
      return;
    }
    for (const file of list) {
      Log(file);
      if (WhiteDirs.some(item => file.includes(item))) {
        continue;
      }
      const joinDir = `${dir}/${file}`;
      const absPath = getAbsPath(joinDir);
      if (!isDir(absPath)) {
        continue;
      }

      fs.readdir(absPath, (err2, innerList) => {
        if (err2) {
          console.log(`❌ readdir ${absPath.split('packages').pop()}`);
          return;
        }
        if (innerList.includes('package.json')) {
          // 是 package
          exetype === 'publish' ? exePublish(absPath) : exeUnPublish(absPath);
        } else {
          traverseDir(joinDir);
        }
      });
    }
  });
}

// 进入 package 执行 npm publish
function exePublish(pkgPath) {
  fs.readFile(`${pkgPath}/package.json`, 'utf-8', (err, str) => {
    if (err) {
      return console.log(`❌ readFile ${pkgPath.split('packages').pop()}`);
    }
    const pkgJson = JSON.parse(str);
    const pkgName = pkgJson.name;
    const isPicComp = pkgName.includes(CmpPrdfix);
    if (isPicComp) {
      const ls = spawn('npm', ['publish'], { cwd: pkgPath });
      ls.stderr.on('data', data => console.error(`${data}`));
      ls.on('close', code => console.log(code ? `❌ publish ${pkgName}失败` : `✅ publish ${pkgName}成功`));
    }
  });
}

// 进入 package 执行 npm unpublish -f
function exeUnPublish(pkgPath) {
  fs.readFile(`${pkgPath}/package.json`, 'utf-8', (err, str) => {
    if (err) {
      return console.log(`❌ readFile ${pkgPath.split('packages').pop()}`);
    }
    const pkgJson = JSON.parse(str);
    const pkgName = pkgJson.name;
    const isPicComp = pkgName.includes(CmpPrdfix);
    if (isPicComp) {
      const ls = spawn('npm', ['unpublish', pkgName, '--force'], { cwd: pkgPath });
      ls.stderr.on('data', data => console.error(`${data}`));
      ls.on('close', code => console.log(code ? `❌ unpublish ${pkgName}失败` : `✅ unpublish ${pkgName}成功`));
    }
  });
}
