"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/mysql-conn'),
    connection = _require.connection;

var numeral = require('numeral'); //도시 리스트


router.get('/', function (req, res) {
  var sql = 'SELECT * FROM city ORDER BY name ASC';

  var onQuery = function onQuery(err, r) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = r[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        v.population = numeral(v.population).format('0,0') + '명';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    res.render('city/list', {
      file: 'city',
      data: r
    });
  };

  connection.query(sql, onQuery); //onQuery(callback)실행돼야 찍히기 때문에 onQuery안에
}); //도시 등록

router.get('/create', function (req, res) {
  res.render('city/create', {
    file: 'city'
  });
}); //도시 등록(저장)

router.post('/save', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      lat = _req$body.lat,
      lon = _req$body.lon,
      population = _req$body.population,
      summary = _req$body.summary;
  var sql = "INSERT INTO city SET name=?, lat=?, lon=?, population=?, summary=?";
  var value = [name, lat, lon, population, summary];

  var onQuery = function onQuery(err, r) {
    res.redirect('/city');
  };

  connection.query(sql, value, onQuery);
}); //도시 삭제

router.get('/remove/:id', function (req, res) {
  //주소줄로 가변주소 받을 때 :('/remove/:id'), req.params.id
  var sql = 'DELETE FROM city WHERE id=' + req.params.id;

  var onQuery = function onQuery(err, r) {
    res.redirect('/city');
  };

  connection.query(sql, onQuery);
}); // 도시 수정
// -수정하는 페이지

router.get('/update/:id', function (req, res) {
  var sql = 'SELECT * FROM city WHERE id=' + req.params.id;

  var onQuery = function onQuery(err, r) {
    res.render('city/update', {
      file: 'city',
      r: r[0]
    });
  };

  connection.query(sql, onQuery);
}); // -수정하고 저장

router.post('/update', function (req, res) {
  //res.json(req.body);
  var _req$body2 = req.body,
      name = _req$body2.name,
      lat = _req$body2.lat,
      lon = _req$body2.lon,
      population = _req$body2.population,
      summary = _req$body2.summary,
      id = _req$body2.id;
  var sql = 'UPDATE city SET name=?, lat=?, lon=?, population=?, summary=? WHERE id=?';
  var value = [name, lat, lon, population, summary, id];

  var onQuery = function onQuery(err, r) {
    res.redirect('/city');
  };

  connection.query(sql, value, onQuery);
});
module.exports = router;