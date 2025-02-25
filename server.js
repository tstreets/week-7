const http = require("http");
const fs = require("fs");
const path = require("path");

const WebFile = require("./functions/webfile");

function app(req, res) {
  const reqWebFile = new WebFile(req.url);
  const homepageUrls = ["/", "/index.html"];

  if (fs.existsSync(reqWebFile.reqResource)) {
    res.writeHead(200, { "Content-Type": reqWebFile.getMimeType() });
    res.write(fs.readFileSync(reqWebFile.reqResource));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(fs.readFileSync(WebFile.errorPage));
  }

  //   res.writeHead(200, { "Content-Type": reqWebFile.getMimeType() });

  //   if (homepageUrls.includes(req.url)) {
  //     res.write(fs.readFileSync(path.join(__dirname, "views/index.html")));
  //   } else if (req.url === "/css/style.css") {
  //     res.write(fs.readFileSync(path.join(__dirname, "views/css/style.css")));
  //   } else {
  //     res.write("<h1>Alligator</h1>");
  //   }

  res.end();
}

const server = http.createServer(app);

const port = process.env.PORT || 3445;
server.listen(port);

console.log(`http://localhost:${port}`);
