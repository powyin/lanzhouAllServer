// 'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var tileInfo = require('../../data/tileInfo')
var minZoom = tileInfo.minZoom
var maxZoom = tileInfo.maxZoom

for (var i = minZoom; i <= maxZoom; i++) {
  eval(`var file${i} = '../data/${i}.sqlite'`)
  eval(`var db${i} = new sqlite3.Database(file${i})`)
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

module.exports = router;