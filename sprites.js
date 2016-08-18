var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $http.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then(function (response) {
      $scope.myData = response.data.results;
      $scope.pokeList = [];
      $scope.pokeURL = [];
      $scope.officeList = ['Dallas','Houston','Atlanta','Las Angeles','San Francisco','Seattle','Chicago','New York'];
      $scope.heights = [56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78];
      
      for (key in $scope.myData){
          $scope.pokeList.push($scope.myData[key].name);
          $scope.pokeURL.push($scope.myData[key].url);
          
      }
      
      $scope.pokeAssignments = [];
      
      for(height in $scope.heights){
          bucket = [];
          for(pokemon in $scope.pokeList){
              i = 0;
              bucket.push($scope.pokeList.pop())
              $scope.pokeAssignments.push({
                  key: height, 
                  value: bucket});
              i++;
              if(i=7){
                  break;
              }
          }
      }
      
     
  });
});