var aplicatie=angular.module("apicatie", ['ui.router','ngRoute','hits_controller','hit_controller','newHit_controller','dj_controller']);

aplicatie.config(["$stateProvider", '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/Home');
    
    $stateProvider
    .state('Home',{
       url: '/Home',
       templateUrl: 'views/home.html'
        
    })
      
    .state('Help',{
       url: '/Help',
       template: '<h2>Ai nevoie de ajutor? Daca da, intra in sectiunea contact si contacteaza-ne.</h2>'
        
    })
    .state('Contact',{
       url: '/Contact',
       template: '<h3><center>Telefon:021401401<br/>E-mail:djzone@romania.r<br/>Adresa:Bucuresti,Romania</center></h3>'
        
    })
    .state('Djs',{
       url: '/Djs',
       templateUrl: 'views/djs.html',
       controller:'dj_controller'
        
    })
    .state('Hits',{
       url: '/Hits',
       templateUrl:'views/Hits.html',
       controller: 'hits_controller'
        
    })
    .state('addHit',{
       url: '/addHit',
       templateUrl:'views/addHit.html',
       controller: 'newHit_controller'
        
    })
    .state('Hit',{
       url: '/Hit/:id',
       templateUrl:'views/Hit.html',
       controller: 'hit_controller'
        
    })
  
     
}]);
