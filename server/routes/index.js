// 'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var tileInfo = require('../../data/tileInfo')
var minZoom = tileInfo.minZoom
var maxZoom = tileInfo.maxZoom

for (var i = minZoom; i <= maxZoom; i++) {
  eval(`var file${i}f1 = '../data/${i}f1.sqlite'`)
  eval(`var file${i}f2 = '../data/${i}f2.sqlite'`)
  eval(`var file${i}f3 = '../data/${i}f3.sqlite'`)
  eval(`var file${i}f4 = '../data/${i}f4.sqlite'`)
  eval(`var db${i}f1 = new sqlite3.Database(file${i}f1)`)
  eval(`var db${i}f2 = new sqlite3.Database(file${i}f2)`)
  eval(`var db${i}f3 = new sqlite3.Database(file${i}f3)`)
  eval(`var db${i}f4 = new sqlite3.Database(file${i}f4)`)

}
// 查询pbf数据接口
router.get('/getData', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/octet-stream");
  let x = req.query.x
  let y = req.query.y
  let z = req.query.z
  let db = eval(`db${z}`)
  db.all(`SELECT * FROM tiles WHERE (z,x,y)=(${z},${x},${y})`, function (err, row) {
    if (row && row[0]) {
      res.write(row[0].tile_data)
      res.end()
    } else {
      res.write('')
      res.end()
    }
  })
})

// 查询png数据接口
router.get('/getPngData', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "image/png");
  let x = req.query.x
  let y = req.query.y
  let z = req.query.z
  let f = req.query.f;
  let db = eval(`db${z}${f}`)
  db.all(`SELECT * FROM tiles WHERE (z,x,y)=(${z},${x},${y})`, function (err, row) {
    if (row && row[0]) {
      res.write(row[0].tile_data)
      res.end()
    } else {
      res.write('')
      res.end()
    }
  })
})

module.exports = router;