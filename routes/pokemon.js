var express = require('express');
var getPokemonByOffice = require('../offices.js');
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

  // catch error
  if(!req.body.hasOwnProperty('inches') || !req.body.hasOwnProperty('feet') || !req.body.hasOwnProperty('office')){
    console.log('missing property in POST request body');
    res.send({error:'missing property in POST request body'});
  }

  var pokeList = getPokemonByOffice(req.body.office);
  console.log('+ got pokeList of length:');
  console.log(pokeList.length);
//  var height = parseInt(req.body.inches) + parseInt(req.body.feet);
  var height = parseInt(req.body.inches) + parseInt(req.body.feet)*12;
  console.log('+ got height:');
  console.log(height);

  var bucketSize = Math.floor((pokeList.length)/8);
  console.log('+ got bucketSize:');
  console.log(bucketSize);
  var bucketNo = Math.floor((height - 59)/2);
  console.log('+ got bucketNo:');
  console.log(bucketNo);

  var max = bucketNo * bucketSize;
  console.log('+ got max index:');
  console.log(max);
  var min = (bucketNo-1) * bucketSize;
  console.log('+ got min index:');
  console.log(min);

  var randomIntFromInterval = function(minimum, maximum) {
      return Math.floor(Math.random()*(maximum-minimum+1)+minimum);
  };
  console.log('+ got randomIntFromInterval:');
  console.log(randomIntFromInterval);

  var pokemonIndex = (function() {
  	if (bucketNo >= 8) {
  		return randomIntFromInterval(max, pokeList.length);
  	} else if (bucketNo <= 1) {
  		return randomIntFromInterval(0, bucketSize);
  	} else {
  		return randomIntFromInterval(min, max);
  	}
  })();
  console.log('+ got pokemonIndex:');
  console.log(pokemonIndex);

  if(pokemonIndex >= pokeList.length) {
    pokemonIndex = pokeList.length-1;
  }
  var targetPokemonId = pokeList[pokemonIndex]['id'];
  console.log('+ got targetPokemonId:');
  console.log(targetPokemonId);

  for(var i = 0; i < pokemonList.length; i++) {
    var current = pokemonList[i];
    if(current['id'] === targetPokemonId) {
      console.log('located and returning pokemon: ' + current['name']);
      current['office'] = req.body.office;
      res.send(current);
      break;
    }
  };
});

module.exports = router;
