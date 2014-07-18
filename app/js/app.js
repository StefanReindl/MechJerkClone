
/*================================================================
=>                  App = battleship
==================================================================*/
/*global angular*/

function Cell(x,y) {
	this.fired = false;
	this.hit = false;
	this.x = x;
	this.y = y;
	return this;
}

var board = [];

for (var row = 0; row < 10; row++) {
	for (var col = 0; col < 10; col++) {
		if (!board[row]) {
			board[row] = []
		}
		board[row][col] = new Cell(row,col);
	}
}

var boardModule = angular.module('boardModule', [])
	.value('board', board);


var app = angular.module('battleship', ['ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router','boardModule']);


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