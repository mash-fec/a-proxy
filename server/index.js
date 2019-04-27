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
  proxy.web(req, res, { target: 'http://ec2-54-175-40-167.compute-1.amazonaws.com:3003/' });
});

app.all('/description', (req, res) => {
  proxy.web(req, res, { target: 'http://18.220.111.23:3210/' });
});

app.all('/totalReviews', (req, res) => {
  proxy.web(req, res, { target: 'http://reviews.pfuzgfpajh.us-west-2.elasticbeanstalk.com/' });
});

app.all('/morehomes', (req, res) => {
  proxy.web(req, res, { target: 'http://52.88.112.117:3000/' });
});

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
