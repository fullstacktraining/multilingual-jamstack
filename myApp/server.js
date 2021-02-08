const express = require("express");
const https = require("https");
const compression = require("compression");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;
// update this location to serve the right files
const buildLocation = "dist/static";

app.use(compression());
app.use(express.static(buildLocation));
app.use((req, res, next) => {
  if (!req.originalUrl.includes(buildLocation)) {
    res.sendFile(`${__dirname}/${buildLocation}/index.html`);
  } else {
    next();
  }
});
// update this to point to your own localhost key and cert files (https://expeditedsecurity.com/blog/localhost-ssl-fix/)
const options = {
  key: fs.readFileSync(`${process.env.HOME}/.localhost-ssl/key.pem`),
  cert: fs.readFileSync(`${process.env.HOME}/.localhost-ssl/cert.pem`),
};

const server = https.createServer(options, app);

server.listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log(`HTTP/2 server listening on port: ${port}`);
  }
});
