const path = require("path");

class WebFile {
  static mimeTypes = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
  };

  reqDetails = {};
  reqUrl = {};
  reqResource = "";

  static errorPage = path.join(__dirname, "../views/404.html");

  constructor(reqUrl) {
    this.reqUrl = reqUrl;

    this.reqDetails = path.parse(reqUrl);
    const reqResourcePath = path.join(__dirname, "../views", reqUrl);

    if (this.reqDetails.ext) {
      this.reqResource = reqResourcePath;
    } else if (this.reqDetails.base) {
      this.reqResource = reqResourcePath + ".html";
    } else {
      this.reqResource = reqResourcePath + "index.html";
    }
  }

  getMimeType() {
    const reqExt = this.reqDetails.ext;
    return WebFile.mimeTypes[reqExt] || "text/html";
  }
}

module.exports = WebFile;
