#!/usr/bin/env node

const path = require('path');
const { spawn } = require('node:child_process');

const resolvePath = relaPath => path.resolve(__dirname, relaPath);

/**
 * 生成icon组件和iconfont
 * arga:
 *   font: 只生成iconfont */

const args = process.argv.slice(2);
let font = false;
if (!args.length || args.includes('font')) {
  font = true;
}

const PrefixDir = '../packages/basecmp/icon';
const svgDir = resolvePath(`${PrefixDir}/assets`);
const iconPath = resolvePath(`${PrefixDir}/src/icon.js`);

const fontDir = resolvePath(`${PrefixDir}/src/fonts`);
const cssPath = resolvePath(`${PrefixDir}/src/font.less`);

let cfg = { svgDir, iconPath };
if (font) {
  cfg = { ...cfg, fontDir, cssPath, initCode: 0xe000 };
}
const cmdArgs = Object.keys(cfg).reduce((acc, k) => {
  acc.push(`${k}=${cfg[k]}`);
  return acc;
}, []);

// 生成 icon 组件和 iconfont css
const ls = spawn('node', [resolvePath(`${PrefixDir}/scripts/gene-icon-bin.cjs`), ...cmdArgs]);
ls.stdout.on('data', data => console.log(`${data}`));
ls.stderr.on('data', data => console.error(`${data}`));
ls.on('close', code => {
  console.log(!code ? '✅ svg编译完成' : '❌ svg编译失败');
});

