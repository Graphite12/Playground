import http from 'http';
import https from 'https';
const port = 7777;

const httpInitialize = (app) => {
  http.createServer(app).listen(port);
};

const httpsInitialize = (app) => {};
