var officeData = require('./officeData');
var fullList = require('./pokemonList');
var _ = require('lodash');

var getPokemonByOffice = function(office) {
  console.log('getting pokemon by office: ' + office);
  var officeTypes = officeData[office]; //hopefully this is an array
  var subList = [];

  // for each pokemon
  for(var p = 0; p < fullList.length; p++) {
    var current = fullList[p];

    // for each type this pokemon belongs to
    for(var t = 0; t < current['types'].length; t++) {
      if(officeTypes.indexOf(current['types'][t]) != -1) {
        subList.push(current);
        break;
      }
    }
  }

  // sort subList using lodash
  subList = _.sortBy(subList, 'height');

  return subList; // return list of the pokemon represented at the queried office
}

module.exports = getPokemonByOffice;
