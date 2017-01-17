var newHit_controller = angular.module('newHit_controller', []);

newHit_controller.controller('newHit_controller', ['$scope','$http', function($scope,$http) {
    $scope.hits = {};
    $scope.newHit=function(){
        $http.post('/hits',$scope.hits).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        });
    };
}]);