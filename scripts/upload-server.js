// 上传文件到服务器

const { spawnSync } = require('child_process');
const path = require('path');

const getAbsPath = relaPath => path.resolve(__dirname, relaPath);
const cwd = getAbsPath('../');

const zipPath = `./zip.zip`;

const zipCmd = spawnSync('zip', ['-r', '-q', `${zipPath}`, './', '-x', './node_modules/*', '-x', './.git/*', '-x', './.DS_Store'], {
  cwd,
  shell: process.platform === 'win32',
});
if (zipCmd.error) {
  console.log('❌ 压缩失败', zipCmd.error);
  spawnSync('rm', ['-rf', `${zipPath}`], { cwd });
  process.exit(1);
}

console.log('✅ 压缩完成');
const scpCmd = spawnSync('scp', ['-r', `${zipPath}`, 'root@10.10.71.158:/work-pic'], { cwd });
console.log(scpCmd.error ? `❌ 上传失败` : `✅ 上传成功`)

spawnSync('rm', ['-rf', `${zipPath}`], { cwd });
