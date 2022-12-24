#!/usr/bin/env node

/**
 * build 前插入组件 example 源码
 **/

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const resolvePath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();

// const CmdArgs = process.argv.slice(2);

const WhiteDirs = ['styles', 'template', 'utils', 'node_modules', '.DS_Store']; // 跳过的目录

const PkgDir = resolvePath('../packages');
const TmpDir = resolvePath('../../pkg.tmp.bck');

const FlagReg = /(\n\s+compPath:\s+)'[^']+',/;

exeCmd('cp', ['-r', PkgDir, TmpDir]).then(() => {
  // 进入 package 注入 example/usage.vue 源码
  traverseDir(PkgDir);
  console.log('遍历完成，源码注入完成');

  exeCmd('webpack', ['--mode=production', '--node-env=production']).then(() => {
    console.log('✅ webpack build 完成');

    exeCmd('rm', ['-rf', PkgDir]).then(() => {
      exeCmd('mv', [TmpDir, PkgDir]).then(() => {
        console.log('✅ 编译完成');
      }).catch((err) => console.log(`❌移动目录失败:\n`, err));
    }).catch(err => console.log(`❌删除目录失败:\n`, err));
  }).catch((err) => console.log(`❌webpack build 失败:\n`, err));
}).catch((err) => console.log(`❌复制目录失败:\n`, err));

// 遍历目录
function traverseDir(dir) {
  if (WhiteDirs.some(item => dir.includes(item))) {
    return;
  }
  const dirAbs = resolvePath(dir);
  try {
    const list =  fs.readdirSync(dirAbs);
    for (const file of list) {
      if (WhiteDirs.some(item => file.includes(item))) {
        continue;
      }
      const joinDir = `${dir}/${file}`;
      const absPath = resolvePath(joinDir);
      if (!isDir(absPath)) {
        continue;
      }
      const innerList = fs.readdirSync(absPath);
      if (innerList.includes('package.json')) {
        // 是 package
        handlePackage(absPath);
      } else {
        traverseDir(joinDir);
      }
    }
  } catch (err) {
    console.log(`❌ ${dirAbs.split('packages/').pop()}`, err);
    throw new Error(err);
  }
}

function handlePackage(pkgPath) {
  FlagReg.lastIndex = 0;
  const ExampleFilePath = `${pkgPath}/example/index.vue`;
  let UsageStr = fs.readFileSync(`${pkgPath}/example/usage.vue`, { encoding: 'utf-8' });
  UsageStr = UsageStr.replace(/([`$])/g, '\\$1').replace('</script>', '<\\/script>');
  let exampleIndexStr = fs.readFileSync(ExampleFilePath, { encoding: 'utf-8' });

  const regRes = FlagReg.exec(exampleIndexStr);
  if (!regRes) {
    console.log(`❌ ${pkgPath} 未匹配到 compPath 字符`);
    return;
  }
  FlagReg.lastIndex = 0;
  exampleIndexStr = exampleIndexStr.replace(FlagReg, `$1\`${UsageStr}\`,`);
  fs.writeFileSync(ExampleFilePath, exampleIndexStr, { encoding: 'utf-8' });
}

function exeCmd(...args) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(...args);
    cmd.stdout.on('data', (data) => console.log(String(data)));
    cmd.on('close', code => {
      code ? reject() : resolve();
    });
  });
}
