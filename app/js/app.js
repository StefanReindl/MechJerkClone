
/*================================================================
=>                  App = battleship
==================================================================*/
/*global angular*/


var app = angular.module('battleship', ['ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router', 'btford.socket-io', 'ngDragDrop']);


app.config(['$httpProvider', function ($httpProvider) {
  'use strict';

    // This is required for Browser Sync to work poperly
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      templateUrl: 'templates/game.html',
      controller: 'GameCtrl'
    })
    .state('home', {
      url: '',
      templateUrl: 'templates/home.html',
      controller: 'UserCtrl'
    });
}]);

app.directive('onFinishRender', function ($timeout) {
     console.log('hairy armpits')
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
});    

/*================================================================
=>                  battleship App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
    
    'use strict';

    console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */