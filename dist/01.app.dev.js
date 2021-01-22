"use strict";

var express = require('express');

var path = require('path');

var moment = require('moment');

var _require = require('./modules/mysql-conn'),
    mysql = _require.mysql,
    connection = _require.connection;

var cityRouter = require('./routes/city-route');

var app = express();
app.listen(3000, function () {
  console.log('http://127.0.0.1:3000');
});
app.set('view engine', 'pug');
app.set('veiws', path.join(__dirname, 'views'));
app.locals.pretty = true; // post방식 받을 때 !!

app.use(express.json()); //json으로 만듦

app.use(express.urlencoded({
  extended: false
})); //json이 parsing
// post의 요청사항은 req.body에

app.use('/', express["static"](path.join(__dirname, 'public')));
app.use('/city', cityRouter); // middlewear : front와 backEnd 사이에 있음
// '/' -> middlewear

app.use(function (req, res) {
  res.send('/404');
});