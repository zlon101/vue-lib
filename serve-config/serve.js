const { createServer } = require('http');
const path = require('path');
const fs = require('fs');
const { parse } = require('url');
const querystring = require('querystring');
const multiparty = require('multiparty');
const util = require('util');

const HOST = '127.0.0.1';
const PORT = 8380;

const server = createServer((req, resp) => {
  const contentType = req.headers['content-type'] || '';
  const queryVal = parse(req.url, true).query;

  console.log('\n🔥===== req =========');
  console.log(req.method, contentType);
  console.log('🔥===== req end=========');

  if (req.method === 'OPTIONS') {
    resp.writeHead(200, {
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'http://localhost:7120',
    });
    resp.end();
    return;
  }

  // 请求数据
  let reqData = null;
  if (contentType.includes('multipart/form-data')) {
    reqData = {};
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      for (const [k, val] of Object.entries(fields)) {
        reqData[k] = val[0];
      }
      for (const [name, file] of Object.entries(files)) {
        reqData[name] = file[0];
        // saveDate(name, file[0]);
      }
      resp.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:7120',
        'Content-Type': 'application/json',
      });
      resp.end(JSON.stringify(reqData));
      // resp.end(util.inspect({ fields: fields, files: files }));
    });
    return;
  }
  const reqBuf = [];
  req.on('data', chunk => {
    // console.log('on data => ', chunk);
    reqBuf.push(chunk);
  });
  req.on('end', () => {
    if (contentType === 'application/json') {
      reqData = JSON.parse(Buffer.concat(reqBuf).toString());
    } else if (contentType === 'application/x-www-form-urlencoded') {
      const str = decodeURIComponent(Buffer.concat(reqBuf).toString());
      reqData = querystring.parse(str);
    }
    console.log(`🔥on data end and request data: ${typeof reqData}\n`, reqData);
  });

  // 响应
  // resp.setHeader('Content-Type', 'text/html');
  const jsonDataObj = {
    name: 'plasticine',
    age: 20,
  };
  resp.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://localhost:7120',
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify(jsonDataObj));
  resp.end();
});

server.listen(PORT, HOST, error => {
  if (error) {
    console.log('Something wrong: ', error);
    return;
  }
  console.log(`server is listening on http://${HOST}:${PORT} ...`);
});


function saveDate(fileName, data) {
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, fileName);
    fs.writeFile(file, data, (error) => {
      if (error) {
        reject(error);
        return console.log(error);
      } else {
        resolve();
        console.log("文件创建成功，地址：" + file);
      }
    });
  })

}
