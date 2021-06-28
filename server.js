// httpモジュールをrequire()で呼び出して使っている。
const http = require('http');
// fsモジュールを使用してindex.htmlを読み込み
const html = require('fs').readFileSync('./public/index.html');

// createServerメソッドを使用して、Webサーバーを構築している。
const server = http.createServer();

server.on('request', function (request, response) {
  // ヘッダー情報を記述。文字コードをUTF-8にし、クライアントに返すコンテンツの種類を指定。「text/html」もある。
  response.writeHead(200, { 'Content-Type': 'text/html' });

  response.end(html);
});

server.listen(3001);

// MongoDBの設定を呼び出し。
const connectDB = require("./mongodb.js");
connectDB();
