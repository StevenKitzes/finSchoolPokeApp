var express = require('express');
var request = require('request');
var pokemonList = require('../pokemonList');
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
  res.header('Access-Control-Allow-Origin', "*");
  console.log('got: ', req.body);
  if(req.body.hasOwnProperty('inches')){
    console.log('has inches!');
  }
  for(var i = 0; i < pokemonList.length; i++) {
    var current = pokemonList[i];
    if(current['name'] === 'ekans') {
      res.send(current);
      break;
    }
  };
});

module.exports = router;
