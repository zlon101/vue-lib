#!/usr/bin/env node

/**
 * 压缩指定目录及子目录下的 svg */

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo/lib/svgo');

const resolvePath = relaPath => path.resolve(process.cwd(), relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();
console.log('\nprocess.cwd():', process.cwd());

const WhiteSvg = ['fonts', 'node_modules']; // 不需要压缩的svg目录或文件
const args = process.argv.slice(2);
const targetDir = args[0];
if (!args[0]) {
  console.log('❌ 输入相对于命令执行时的相对目录');
  process.exit(1);
}

console.log(`\n==== 开始压缩${targetDir} =====`);
traverseDir(resolvePath(`./${targetDir}`));

// console.log 关联到 init.js, 不能顺便修改
function traverseDir(dirAbs) {
  fs.readdir(dirAbs, (err, list) => {
    if (err) {
      console.log(`❌ ${dirAbs}`);
      return;
    }
    for (const file of list) {
      const isWhite = WhiteSvg.some(k => file.includes(k));
      if (isWhite) continue;
      if (/\.svg$/.test(file)) {
        const svgPath = path.resolve(dirAbs, file);
        fs.readFile(svgPath, 'utf-8', (...resArgs) => rwSvgFile(svgPath, ...resArgs));
      } else if (isDir(`${dirAbs}/${file}`)) {
        traverseDir(`${dirAbs}/${file}`);
      }
    }
  });
}

// 读写svg文件
function rwSvgFile(filePath, err, svgTxt) {
  const fileName = filePath.split('/').pop();
  if (err) {
    console.log(`❌ ${fileName}`);
    return;
  }
  // 已经压缩过
  if (svgTxt.startsWith('<svg')) {
    return;
  }
  // 压缩svg
  let minedSvg = minSvg(svgTxt);

  // 替换id属性值
  const prefix = fileName.replace(/\.svg$/, '').toLowerCase().replace(/^icon-/, '');
  minedSvg = minedSvg.replace(/\s+id=["']([^"']+)["']/g, (matchVal, attriVal) => {
    if (new RegExp(`^${prefix}`).test(attriVal)) return matchVal;
    return ` id="${prefix}-${attriVal}"`;
  });
  // 引用了id的地方，不匹配颜色
  // 1.url(#xx)
  minedSvg = minedSvg.replace(/\s+([^=\s]+)=["']url\(#([^)]+)\)["']/g, (matchVal, attrName, attrVal) => {
    if (new RegExp(`^${prefix}`).test(attrVal)) return matchVal;
    return ` ${attrName}="url(#${prefix}-${attrVal})"`;
  });
  // 2.其他
  minedSvg = minedSvg.replace(/\s+([^=\s]+)=["']#([^'"]+)["']/g, (matchVal, attrName, attrVal) => {
    const isColor = ['fill', 'stroke'].includes(attrName);
    if (isColor || new RegExp(`^${prefix}`).test(attrVal)) return matchVal;
    return ` ${attrName}="#${prefix}-${attrVal}"`;
  });
  /*
  // url(#xx) #fff
  minedSvg = minedSvg.replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`);
  // href="#xx"
  minedSvg = minedSvg.replace(/href=["']#([^'"]+)["']/g, `href="#${prefix}-$1"`);
  // <use xlink="#qr-b-50"></use>
  minedSvg = minedSvg.replace(/xlink=["']#([^'"]+)["']/g, `xlink="#${prefix}-$1"`); */

  // 写入文件
  fs.writeFile(filePath, minedSvg, err => {
    err && console.log(`❌ ${fileName}`);
  });
  console.log(`$ ${fileName}`);
}

// 压缩svg
// https://github.com/svg/svgo
function minSvg(svgString) {
  const result = optimize(svgString, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      // prefixIds
    ],
  });
  const optimizedSvgStr = result.data;
  // 设置preserveAspectRatio
  return optimizedSvgStr;
}
