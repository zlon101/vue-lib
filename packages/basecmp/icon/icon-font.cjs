/**
 * 读取svg文件然后生成字体
 * 自动添加icon-font 的css内容
 */
/**/
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const fontCarrier = require('font-carrier');

const SvgDir = path.resolve(__dirname, './assets');
const IconFontDir = path.resolve(__dirname, './src/fonts');

function setup() {
  // 删除目录
  const ls = spawn('rm', ['-rf', IconFontDir]);
  ls.on('close', code => {
    code && console.log('❌删除失败');
    if (!code) {
      fs.mkdirSync(IconFontDir);
      createIconFont();
    }
  });
}

// 生成字体和css
let InitCode = 0xe000;
function createIconFont() {
  console.log('\n$ 生成字体和css');
  const svgList = fs.readdirSync(SvgDir);
  // 创建空白字体，使用 SVG 生成字体
  const font = fontCarrier.create();
  const unicodeMap = {};

  for (const svgFile of svgList) {
    if (!/\.svg$/.test(svgFile)) {
      continue;
    }
    const svgPath = path.resolve(SvgDir, svgFile);
    const svgStr = fs.readFileSync(svgPath, 'utf-8');
    InitCode++;
    let char = String.fromCharCode(InitCode);
    if (!char) {
      InitCode++;
      char = String.fromCharCode(InitCode);
    }
    // console.log(InitCode, char);
    // unicode
    font.setSvg(char, svgStr);
    const cssName = svgFile.split('.')[0];
    unicodeMap[cssName] = `\\${char.charCodeAt().toString(16)}`;
  }

  // 输出字体
  const IconName = 'iconfont';
  font.output({
    path: `${IconFontDir}/${IconName}`,
  });
  // 添加css
  const cssFile = path.resolve(__dirname, './src/font.less');
  let cssStr = fs.readFileSync(cssFile, 'utf-8');
  const iconfontCss = Object.keys(unicodeMap).reduce((acc, cssName2) => {
    acc += `
.iconfont.${cssName2}::before {
  content: '${unicodeMap[cssName2]}';
}`;
  return acc;
  }, '');

  const sepStr = '//====== 以下内容为自动生成 ======';
  const sepIdx = cssStr.indexOf(sepStr);
  if (sepIdx !== -1) {
    cssStr = cssStr.slice(0, sepIdx);
  }
  cssStr += `${sepStr}\n${iconfontCss}`;
  fs.writeFile(cssFile, cssStr, err => {
    err && console.log(`\n❌ 生成iconfont css 失败`);
  });
}

module.exports = setup;
