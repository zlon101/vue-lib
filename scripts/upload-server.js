// 上传文件到服务器，有点慢，建议手动压缩后上传到服务器

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const getAbsPath = relaPath => path.resolve(__dirname, relaPath);

const ServerDir = 'root@47.100.207.125:/work/picnpm';
const Blacklist = ['node_modules', '.git', '.DS_Store'];

fs.readdir(getAbsPath('../'), (err, list) => {
  if (err) {
    console.log(`❌ 目录读取失败，`, err);
    return;
  }
  list.forEach(item => {
    if (Blacklist.includes(item)) return;
    const res = spawnSync('scp', ['-r', getAbsPath(`../${item}`), ServerDir]);
    console.log(res.error ? `❌ 上传${item}失败` : `✅ 上传${item}成功`)
  });
});

