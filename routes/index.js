var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Francisco, Grayson, Karrie, Kenny, and Steve<br>Pokemans Hunters');
});

module.exports = router;
