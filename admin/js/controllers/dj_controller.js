var dj_controller=angular.module("dj_controller",['ui.router']);
const server="https://webtech-proiect-lavinia-stan.c9users.io";

dj_controller.controller('dj_controller',['$scope','$http', function($scope,$http){
  
    $http.get(server+'/recipes')
    .then((response)=>{
        $scope.Djs=response.data;
        console.log($scope.Djs);
   })
    .catch((error)=>{
        console.warn(error);
       $scope.Djs='Server Error';
   });
       
}]);