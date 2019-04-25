const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.all('/house_images', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3003' });
});

app.all('/description', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3210' });
});

app.all('/totalReviews', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3004' });
});

// app.all('/morehomes', (req, res) => {
//   proxy.web(req, res, { target: 'http://localhost:3000' });
// });

app.all('/morehomes', (req, res) => {
  proxy.web(req, res, { target: 'http://52.88.112.117:3000/' });
});

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
