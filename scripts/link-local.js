#!/usr/bin/env node

/**
 * d: 删除本地 @pic 软链接
 * c: 执行组件内部的 npm run link-local，为所有组件的依赖创建本地软链接
 */

const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');
const { LogErr } = require('./util');
// const { CmpPrdfix } = require('./cfg.js');

// const Scope = CmpPrdfix.replace(/\/$/, '');
const resolvePath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();

const args = process.argv.slice(2);
if (!args.length) {
  LogErr('输入参数： type=<d|c> dir=[xx]，删除本地链接或者建立链接');
  process.exit(1);
}

const param = args.reduce((acc, item) => {
  const [k, v] = item.split('=');
  acc[k] = v;
  return acc;
}, {});

const WhiteDirs = ['styles', 'template', 'utils', 'node_modules']; // 跳过的目录

if (param.type === 'c') {
  let targetDir = 'packages';
  if (param.dir) {
    targetDir = param.dir;
  }
  traverseDir(path.resolve(__dirname, `../${targetDir}`));
} else if (param.type === 'd') {
  console.log('\n$ 请手动执行: rm -rf packages/**/**/node_modules');
  // deleteSymLink();
} else {
  console.log('\n$ 请输入参数，如：npm run link:all type=<c|d>');
}

// 遍历目录
function traverseDir(dir) {
  if (WhiteDirs.some(item => dir.includes(item))) {
    return;
  }
  const dirAbs = resolvePath(dir);
  fs.readdir(dirAbs, (err, list) => {
    if (err) {
      console.log(`❌ ${dirAbs.split('packages/').pop()}`);
      return;
    }
    for (const file of list) {
      if (WhiteDirs.some(item => file.includes(item))) {
        continue;
      }
      const joinDir = `${dir}/${file}`;
      const absPath = resolvePath(joinDir);
      if (!isDir(absPath)) {
        continue;
      }

      fs.readdir(absPath, (err2, innerList) => {
        if (err2) {
          console.log(`❌ ${absPath.split('packages').pop()}`);
          return;
        }
        if (innerList.includes('package.json')) {
          // 是 package
          exePackageLink(absPath);
        } else {
          traverseDir(joinDir);
        }
      });
    }
  });
}

// 删除全局node_modules下 @pic 目录
function deleteSymLink() {
  const res = spawnSync('rm', ['-rf', 'packages/**/**/node_modules'], { cwd: resolvePath('../') });
  if (res.error) {
    console.log('❌ 删除失败\n', res.error);
  } else {
    console.log('✅ 删除成功', `${resolvePath('../packages')}/**/**/node_modules`);
  }
  /****
  let res = spawnSync('npm', ['root', '-g']);
  const npmRoot = res.stdout.toString().replace(/\n+/g, '');
  res = spawnSync('ls', [npmRoot]);
  if (res.stdout.toString().includes(Scope)) {
    res = spawnSync('rm', ['-rf', `${npmRoot}/${Scope}`]);
    if (!res.error) {
      console.log('✅删除成功', res.stdout.toString());
    } else {
      console.log(res.error.toString());
    }
  }
  ****/
}

// 进入 package 执行 npm run link-local
function exePackageLink(pkgPath) {
  fs.readFile(`${pkgPath}/package.json`, 'utf-8', (err, str) => {
    if (err) {
      return console.log(`❌ readFile ${pkgPath.split('packages').pop()}`);
    }
    const pkgJson = JSON.parse(str);
    const hasLinkLocal = pkgJson.scripts && pkgJson.scripts['link-local'];
    if (hasLinkLocal) {
      const ls = spawn('npm', ['run', 'link-local'], { cwd: pkgPath });
      ls.stderr.on('data', data => console.error(`${data}`));
      const dirName = pkgPath.split('/packages').pop();
      ls.on('close', code => console.log(code ? `❌ ${dirName}失败` : `✅ ${dirName}成功`));
    }
  });
}
