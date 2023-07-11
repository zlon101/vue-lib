#!/usr/bin/env node

const path = require('path');
const { spawn } = require('node:child_process');
const Cfg = require('./cfg.js');
const { lockVersion, checkPackage } = require('./util.js');

const resolvePath = relaPath => path.resolve(__dirname, relaPath);

const CmdArgs = process.argv.slice(2) || [];

if (!CmdArgs.includes('-build')) {
  // 锁版本
  lockVersion(true);

  // 检查组件的 example、README、package.json 文件
  [Cfg.BscmpDir, Cfg.Business, Cfg.ExtendDir, Cfg.DirectivesDir].forEach(dir => checkPackage(dir));
}

// 压缩 svg
let hasFix = false; // 是否有更新
let hasErr = false; // 是否有报错
const ls = spawn('npm', ['run', 'minSvg', resolvePath('../packages/basecmp/icon/assets')], {
  shell: process.platform === 'win32',
});
ls.stdout.on('data', data => {
  const str = `${data}`;
  console.log(str);
  if (/\.svg$/.test(str)) {
    hasFix = true;
  }
  if (str.includes('❌')) {
    hasErr = true;
  }
});
ls.stderr.on('data', data => console.error(`${data}`));
ls.on('close', code => {
  console.log(!code ? '✅ svg压缩完成' : '❌ svg压缩失败');
  if (!code && hasFix && !hasErr) {
    // 生成icon组件和iconfont css
    spawn('npm', ['run', 'build:icon'], {
      shell: process.platform === 'win32',
    });
  }
});

// 生成utils 和全局 style 注释文档
const ls2 = spawn('npm', ['run', 'gene-note'], {
  cwd: resolvePath('../packages/utils'),
  shell: process.platform === 'win32',
});
ls2.on('close', code => {
  console.log(!code ? '✅ 生成utils 注释完成' : '❌ 生成utils 注释失败');
});

const ls3 = spawn('npm', ['run', 'gene-note'], {
  cwd: resolvePath('../packages/styles'),
  shell: process.platform === 'win32',
});
ls3.stderr.on('data', data => console.error(`${data}`));
ls3.on('close', code => {
  console.log(!code ? '✅ 生成styles example 完成' : '❌ 生成styles example 失败');
});
