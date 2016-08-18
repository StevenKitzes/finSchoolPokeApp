var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  request('http://pokeapi.co/api/v2/pokemon/charizard/', function (error, response, body) {
    if(error) {
      console.log('FATAL ERROR: ' + error);
      return;
    }
    console.log('STATUS CODE: ' + response.statusCode);
    if (response.statusCode == 200) {
      console.log('got a POST request');
      res.send(body);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log('got: ', req.body);
  res.send('hello!');
});

module.exports = router;
