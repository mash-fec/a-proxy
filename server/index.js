const express = require('express');
const expresstaticGzip = require('express-static-gzip');
const bodyParser = require('body-parser');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', expresstaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

app.all('/house_images', (req, res) => {
  proxy.web(req, res, { target: 'http://52.87.228.239:3003/' });
});

app.all('/description', (req, res) => {
  proxy.web(req, res, { target: 'http://18.188.174.153:3210/' });
});

app.all('/totalReviews', (req, res) => {
  proxy.web(req, res, { target: 'http://reviews.pfuzgfpajh.us-west-2.elasticbeanstalk.com/' });
});

app.all('/morehomes', (req, res) => {
  proxy.web(req, res, { target: 'http://52.27.3.181:3000/' });
});

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
