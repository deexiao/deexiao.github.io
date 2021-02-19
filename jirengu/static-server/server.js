var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  response.statusCode = 200;

  // 初始化首页 如果 path 是 / 就变成 index.html
  const filePath = path === "/" ? "/index.html" : path;

  // 比如 /a.html, 第 2 个是 .
  const index = filePath.lastIndexOf(".");

  // suffix 意思是后缀
  // .html 或 .css 或 ...
  const suffix = filePath.substring(index);

  // 哈希表
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };

  response.setHeader(
    "Content-Type",
    // "text/html" 表示如果哈希表上的全都没有, 就得有个保底值
    `${fileTypes[suffix] || "text/html"};charset=utf-8`
  );

  let content;

  // 预防文件不存在
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = "文件不存在";
    // 状态码404
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
