#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Cfg = require('./cfg');

const Log = (...args) => console.log('\n🔥', ...args);
const LogErr = (...args) => console.log(`\n❌`, ...args);
const LogLine = str => {
  console.log(`\n$ ========== ${str} =============`);
};

const getAbsPath = (...args) => path.resolve(...args);

// 修改组件package.json 中 publishConfig 和其他指定字段
async function editPackage(packagePath, fieldMap = {}) {
  const cfg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  const packageName = fieldMap.name || cfg.name;
  // 添加组件scope
  if (!cfg.name) {
    LogErr(`${packagePath}没有name字段`);
  } else if (!cfg.name.includes(Cfg.CmpPrdfix)) {
    cfg.name = Cfg.CmpPrdfix + packageName;
  }
  // 添加
  if (!cfg.publishConfig) {
    cfg.publishConfig = {
      registry: Cfg.PrivateRegistry,
    };
  } else if (cfg.publishConfig.registry !== Cfg.PrivateRegistry) {
    cfg.publishConfig.registry = Cfg.PrivateRegistry;
  }
  // 修改其他指定字段
  Object.keys(fieldMap).forEach(k => {
    {
      const val = fieldMap[k];
      if (!val && cfg[k] && k !== 'name') {
        // 删除字段
        delete cfg[k];
      } else {
        cfg[k] = val;
      }
    }
  });

  // console.log(`$ ${packagePath.split('src/').pop()}`);
  fs.writeFile(packagePath, JSON.stringify(cfg, null, 2), err => {
    err && LogErr(`${packagePath} 写入失败`);
  });
}

/**
 * 删除dependencies 和 devDependencies 中版本号前面的 ~ ^ 等
 * 锁定package.json 中依赖的版本，避免npm 自动升级包的版本
 * 若需要升级版本手动升级
 * 保证每次执行 npm install 得到一致的包
 */
function lockVersion(isInit = false) {
  const packagePath = getAbsPath(__dirname, '../package.json');
  const packageCfg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  const depObj = packageCfg.dependencies;
  const devDep = packageCfg.devDependencies;
  let hasFix = false;
  [depObj, devDep].forEach(item => {
    Object.keys(item).forEach(k => {
      const vers = item[k];
      // 版本号没有固定
      if (/^\D/.test(vers)) {
        hasFix = true;
        item[k] = vers.replace(/^\D+/, '');
      }
    });
  });
  if (hasFix) {
    fs.writeFileSync(packagePath, JSON.stringify(packageCfg, null, 2) + '\n');
    if (!isInit) {
      LogErr('package.json 中依赖的版本号有变更, 请重新git add . && git commit');
      process.exit(1);
    }
  }
}

/**
 * 检查组件的 example、README、package.json 文件
 */
function checkPackage(targetDir) {
  const CheckFiles = ['README.md', 'package.json', 'example'];
  try {
    const cmpDirList = fs.readdirSync(targetDir);
    for (const cmpDir of cmpDirList) {
      const absPath = `${targetDir}/${cmpDir}`;
      if (fs.lstatSync(absPath).isDirectory() && !/^\./.test(cmpDir)) {
        const fileList = fs.readdirSync(getAbsPath(__dirname, '../', absPath));

        CheckFiles.forEach(name => {
          if (!fileList.includes(name)) {
            LogErr(`${absPath} 没有 ${name}`);
          }
        });

        if (fileList.includes('package.json')) {
          const packagePath = getAbsPath(__dirname, `../${absPath}/package.json`);
          const packageCfg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
          if (!packageCfg.name) {
            LogErr(`  ${absPath}没有name字段`);
          }
          if (!packageCfg.publishConfig) {
            LogErr(`  ${absPath}没有publishConfig字段`);
          }
        }
      }
    }
  } catch (err) {
    LogErr('checkDir 失败', err);
  }
  LogLine('package检查结束, 不影响开发');
}

module.exports = {
  Log,
  LogErr,
  LogLine,
  getAbsPath,
  editPackage,
  lockVersion,
  checkPackage,
};
