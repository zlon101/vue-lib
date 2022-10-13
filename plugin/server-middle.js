/**
 * devServer 中间件
 * 获取组件 example code
 * https://v4.webpack.js.org/configuration/dev-server/#devserverbefore
 */

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const Prefix = '../packages';

function getCmpCode(query) {
  const componentPath = query.addre; // basecmp/button
  if (!componentPath) return 'query.addre error!';

  const filePath = path.resolve(__dirname, `${Prefix}/${componentPath}/example/usage.vue`);
  try {
    const str = fs.readFileSync(filePath, 'utf8').toString();
    return str;
  } catch {
    return `读取${componentPath}失败`;
  }
}

function setCmpCode(req) {
  console.log('\n\n========== setCmpCode =========\n');
  const param = req.body;
  if (!param.addre) return 'req.addre error!'; // basecmp/button
  if (!param.code) return 'req.code error!';

  const filePath = path.resolve(__dirname, `${Prefix}/${param.addre}/example/usage.vue`);
  const res = {
    code: 200,
  };
  try {
    fs.writeFileSync(filePath, param.code);
    res.msg = `${param.addre} update success`;
    return res;
  } catch (err) {
    res.code = 500,
    res.msg = err;
    return res;
  }
}

module.exports = function (app, server, compiler) {
  app.use(bodyParser.json());
  // 获取本地组件的example.vue
  // url: req.url,
  app.get('/example-code', function (req, res) {
    const codeStr = getCmpCode(req.query);
    res.json({ codeStr });
  });
  // 修改本地组件的example.vue
  app.post('/update-code', function (req, res) {
    const result = setCmpCode(req);
    res.json({ status: result });
  });
};
