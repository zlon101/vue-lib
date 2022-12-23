/**
 * 读取svg文件然后生成字体
 * 自动添加icon-font 的css内容 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const fontCarrier = require('font-carrier');

// const svgDir = path.resolve(process.cwd(), './assets');
// const fontDir = path.resolve(process.cwd(), './src/fonts');

function setup({svgDir, fontDir}) {
  // 删除目录
  const ls = spawn('rm', ['-rf', fontDir]);
  ls.on('close', code => {
    code && console.log(`❌删除 ${fontDir} 失败`);
    if (!code) {
      fs.mkdirSync(fontDir);
      createIconFont.apply(this, arguments);
    }
  });
}

/*
* 生成字体和css
* let initCode = 0xe000;
* */
const Blacklist = ['icon-calender', 'icon-dele', 'icon-hook', 'icon-loading-arrow', 'icon-loading', 'icon-prohibite', 'icon-question', 'icon-refresh', 'icon-search', 'icon-empty']; // 生成的iconfont无法使用
function createIconFont(param) {
  const { svgDir, fontDir, cssPath } = param;
  let initCode = parseInt(param.initCode);
  console.log('$ 生成字体和css');
  const svgList = fs.readdirSync(svgDir);
  // 创建空白字体，使用 SVG 生成字体
  const font = fontCarrier.create();
  const unicodeMap = {};

  for (const svgFile of svgList) {
    if (!/\.svg$/.test(svgFile) || Blacklist.some(name => `${name}.svg` === svgFile)) {
      continue;
    }
    const svgPath = path.resolve(svgDir, svgFile);
    const svgStr = fs.readFileSync(svgPath, 'utf-8');
    initCode++;
    let char = String.fromCharCode(initCode);
    if (!char) {
      initCode++;
      char = String.fromCharCode(initCode);
    }
    // console.log(initCode, char);
    // unicode
    font.setSvg(char, svgStr);
    const cssName = svgFile.split('.')[0];
    unicodeMap[cssName] = `\\${char.charCodeAt().toString(16)}`;
  }

  // 输出字体
  const IconName = 'iconfont';
  font.output({
    path: `${fontDir}/${IconName}`,
  });
  // 添加css
  // const cssPath = path.resolve(__dirname, './src/font.less');
  let cssStr = fs.readFileSync(cssPath, 'utf-8');
  const iconfontCss = Object.keys(unicodeMap).reduce((acc, cssName2) => {
    acc += `
.iconfont.${cssName2}::before {
  content: '${unicodeMap[cssName2]}';
}`;
  return acc;
  }, '');

  const sepStr = '//====== 以下内容为自动生成 ======';
  const regRes = /^\/\/[\s=]*以下内容为自动生成/m.exec(cssStr);
  if (regRes) {
    cssStr = cssStr.slice(0, regRes.index);
  }
  cssStr += `${sepStr}\n${iconfontCss}`;
  fs.writeFile(cssPath, cssStr, err => {
    err && console.log(`\n❌ 生成iconfont css 失败`);
  });
}

module.exports = setup;
