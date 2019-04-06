const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
