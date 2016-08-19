

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http){
    var payload = {};
    $scope.pName;
    $scope.onSubmit = function () {
         var e = document.getElementById("inch");
        var inch = e.options[e.selectedIndex].value;
        e = document.getElementById("feet");
        var feet = e.options[e.selectedIndex].value;
        e = document.getElementById("city");
        var city = e.options[e.selectedIndex].value;
        payload.inch = inch;
        payload.feet = feet;
        payload.city = city;

        /*$.ajax({
                url: "http://172.16.29.91:3000/pokemon",
                type: "POST",
                data: payload,
                success: function(data){
                    console.log(data);
                    $scope.pName = data.name;


                }
        });*/
        
        $http.post('http://172.16.29.91:3000/pokemon', payload).success(function() {
            $scope.pName = data.name;
        });

    }});