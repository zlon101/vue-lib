#!/usr/bin/env node

const path = require('path');
const geneSvgIcon = require('./gene-cmp.cjs');

const resolvePath = relaPath => {
  if (/^[/~]/.test(relaPath)) {
    return relaPath;
  }
  return path.resolve(process.cwd(), relaPath);
};

const args = process.argv.slice(2);
const paramCfg = args.reduce((pre, item) => {
  let [k, v] = item.split('=');
  if (k !== 'initCode') {
    v = resolvePath(v);
  }
  pre[k] = v;
  return pre;
}, {});
// console.log(paramCfg);
if (!args.length || paramCfg.hasOwnProperty('help')) {
  console.log(`
$ ========================================
根据SVG文件生成组件或 iconfont，参数如下:
svgDir=svg文件所在目录
iconPath=生成的图标组件路径
fontDir=生成的字体文件目录，可选
cssPath=生成的 iconfont 样式文件所在路径，可选
initCode=iconfont 编码的初始值，可选
注意:
  1). 所有路径使用绝对路径或相对于命令执行时的相对路径
  2). 不生成 iconfont 时不用传递 fontDir、cssPath、initCode，否则三个参数都必须输入
example: svgDir=./assets iconPath=./xx fontDir=xx cssPath=xx initCode=oxf000
$ ========================================
`);
} else {
  geneSvgIcon(paramCfg.svgDir, paramCfg.iconPath);
  if (paramCfg.fontDir) {
    const geneIconFont = require('./icon-font.cjs');
    geneIconFont(paramCfg);
  }
}
