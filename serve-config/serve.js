const { createServer } = require('http');
const { WebSocketServer } = require('ws');
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
  console.log(`
    method:${req.method}
    contentType: ${contentType}
    url: ${req.url}
  `);

  // 跨域 OPTION 处理
  if (req.method === 'OPTIONS') {
    resp.writeHead(200, {
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'http://localhost:7120',
    });
    resp.end('ok');
    return;
  }

  // JSONP
  if (req.url.includes('tst.js')) {
    resp.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
    });
    resp.end(`
      console.debug('🔥服务端注入脚本');
      corsCb('${req.url}');
    `);
    return;
  }

  // Server Sent Event
  if (req.url === '/server-event') {
    sendServerSendEvent(req, resp);
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
        // 'Access-Control-Allow-Origin': 'http://localhost:7120',
        'Content-Type': 'application/json',
      });
      resp.end(JSON.stringify(reqData));
      // resp.end(util.inspect({ fields: fields, files: files }));
    });
    return;
  }

  const reqBuf = [];
  req.on('data', chunk => {
    console.log('$ on data => ', chunk);
    reqBuf.push(chunk);
  });
  req.on('end', () => {
    if (contentType === 'application/json') {
      reqData = JSON.parse(Buffer.concat(reqBuf).toString());
    } else if (contentType === 'application/x-www-form-urlencoded') {
      const str = decodeURIComponent(Buffer.concat(reqBuf).toString());
      reqData = querystring.parse(str);
    }
    console.log(`$ on data end and request data: ${typeof reqData} =>`, reqData);
  });

  // 响应
  // resp.setHeader('Content-Type', 'text/html');
  const jsonDataObj = {
    ok: true,
    value: 20,
  };
  // res.statusCode = 200;
  // resp.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  resp.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://localhost:7120',
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify(jsonDataObj));
  resp.end();
});

server.on('upgrade', function upgrade(request, socket, head) {
  // const { pathname } = parse(request.url);
  wsInstance.handleUpgrade(request, socket, head, function done(ws) {
    wsInstance.emit('connection', ws, request);
  });
  // socket.destroy();
});


/*** WebSocket *****/
const wsInstance = new WebSocketServer({ noServer: true });
wsInstance.binaryType = "arraybuffer";

wsInstance.on('connection', function connection(ws) {
  ws.on('message', (data)=> {
    console.log('$ 收到来自client的WS消息: ', new TextDecoder().decode(data));

    setTimeout(() => {
      ws.send('定时消息!');
    }, 5000);
  });
  ws.send('connectioning...');
});

/**** Server Sent Event *******/
const SendInterval = 5000;
function sendServerSendEvent(req, res) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://localhost:7120',
    'Content-Type' : 'text/event-stream',
    'Cache-Control' : 'no-cache',
    'Connection' : 'keep-alive'
  });
  const sseId = (new Date()).toLocaleTimeString();

  let count = 0;
  const timeId = setInterval(function() {
    writeServerSendEvent(res, sseId, (new Date()).toLocaleTimeString());
  }, SendInterval);

  writeServerSendEvent(res, sseId, (new Date()).toLocaleTimeString());

  function writeServerSendEvent(res, sseId, data) {
    count++;
    res.write(`id: ${sseId}\n`);
    res.write(`data: first xxx ${data}\n`);
    res.write(`data: second ${count} ${data}\n\n`);
    if (count >= 5) {
      console.log('🔥 关闭 Serve Event');
      clearInterval(timeId);
      res.end();
    }
  }
}

/*********************************/
server.listen(PORT, HOST, error => {
  if (error) {
    console.log('Something wrong: ', error);
    return;
  }
  console.log(`server is listening on http://${HOST}:${PORT} ...`);
});

/*********************************/
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
