const http = require('http');
const express = require('express');
const router = require('../routes/router.js');
const logger = require('../resources/logging.js');
const webServerConfig = require('../config/web-server.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });

    httpServer = http.createServer(app);
    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err); 
        return;
      }
      logger.logger.info(`web server listening on ${webServerConfig.host} : ${webServerConfig.port}`);
      resolve();
    });

    app.use('/app', router); 
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { initialize, close }