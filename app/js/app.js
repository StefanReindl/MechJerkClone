
/*================================================================
=>                  App = battleship
==================================================================*/
/*global angular*/

var app = angular.module('battleship', ['ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router']);


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
    });
}]);

/*================================================================
=>                  battleship App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */