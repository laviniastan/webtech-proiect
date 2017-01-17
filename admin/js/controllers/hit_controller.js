var hit_controller = angular.module('hit_controller', ['ui.router']);
const server="https://webtech-proiect-lavinia-stan.c9users.io";

hit_controller.controller('hit_controller', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    var $constructor = () => {
        $http.get(server + '/Links' + '/' + $stateParams.id + '/Hit')
            .then((response) => {
                $scope.links = response.data;
                console.log($scope.links);
            })
            .catch((error) => {
                console.warn(error);
                $scope.ingredients = "Server error";
            });
            
            $scope.getHits();
            
            $http.get(server +'/djs/'+ $stateParams.id)
            .then((response)=>{
                $scope.Dj=response.data;
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    $scope.getHits = () => {
        $http.get(server +'/Hits').then((res) => {
            $scope.hits = res.data;
        });
    };
   
    $scope.addHit= (hit) => {
        $http.post(server + '/Links' + '/' + $stateParams.id + '/Hits', hit)
          .then((response) => {
            $state.go($state.current, {}, {
              reload: true
            });
          })
          .catch((error) => console.log(error));
      };
    
    //ce afisam
    $scope.selected = {};
    
    //afisare/editare
    $scope.getTemplate = (link) => {
        if (link.id === $scope.selected.id) {
            return 'edit';
        }
        else {
            return 'display';
        }
    };
    
    
    $scope.editLink = (link) => {
        $scope.selected = angular.copy(link)
    };
    
    $scope.cancelEditing = () => {
        $scope.selected = {};
    };

    //salvare modificari 
     $scope.saveLink = (link) => {
        $http.put(server + '/Links' + '/' + $stateParams.id + '/Hits', link)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                });
            }).catch((error) => console.log(error));
    };


    //buton de delete
    $scope.deleteLink = (link) => {
        $http.delete(server + '/links/' + link.id)
          .then((response) => {
            $state.go($state.current, {}, {
              reload: true
            });
          })
          .catch((error) => console.log(error));
      };
    
    $constructor();
}]);
