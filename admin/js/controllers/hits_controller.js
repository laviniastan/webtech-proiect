var hits_controller=angular.module("hits_controller",['ui.router']);
const server="https://webtech-proiect-lavinia-stan.c9users.io";

hits_controller.controller('hits_controller',['$scope','$http', function($scope,$http){
  
    $http.get(server+'/hits')
    .then((response)=>{
        $scope.Hits=response.data;
        console.log($scope.Hits);
    })
    .catch((error)=>{
        console.warn(error);
        $scope.Hits='Server Error';
    });
}]);