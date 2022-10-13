#!/usr/bin/env node

/**
 * 编译单个组件
*/
const { Log, getAbsPath } = require('./util');
const { spawn } = require('node:child_process');
const fs = require('fs');
// const child_process = require('child_process');

const args = process.argv.splice(2);
if (!args.length) {
  Log('请输入编译组件的目录，如: basecmp/button');
  process.exit(1);
}

const compDir = getAbsPath(__dirname, `../package/${args[0]}`);
const libDir = `${compDir}/lib`;
Log(`编译 ${compDir}`);
let cmd = 'npx vue-cli-service build --target lib --format umd-min ';
cmd = cmd + `--dest ${libDir} --name lib ${compDir}/index.js`;

// /**
//  * --formats: commonjs,umd,umd-min
//  * --target: lib wc
//  * --mode: production, development
//  * --dest
//  * --name lib-out
//  */
// /**/
// const ls = child_process.exec(cmd);
// ls.stdout.on('data', data => console.log(`${data}`));
// ls.stderr.on('data', data => console.log(`${data}`));

const list = cmd.split(' ');
const ls = spawn(list[0], list.slice(1));

const BlackLogKey = ['Browserslist', 'browserslist', 'Compiled successfully'];
ls.stdout.on('data', data => {
  const str = `${data}`;
  if (!BlackLogKey.some(k => str.includes(k))) {
    console.log(str);
  }
});

ls.stderr.on('data', data => {
  console.error(`${data}`);
});

ls.on('close', code => {
  Log(!code ? '✅成功' : '❌失败');
  if (!code) {
    fs.unlink(`${libDir}/demo.html`, () => {});
    fs.unlink(`${libDir}/lib.umd.js`, () => {});
  }
});
