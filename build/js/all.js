
/*================================================================
=>                  App = battleship
==================================================================*/
/*global angular*/


var app = angular.module('battleship', ['ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router', 'btford.socket-io']);


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

/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', 'Board', 'WarSocket', function ($scope, Board, WarSocket) {
  'use strict';

	$scope.radarBoard = Board.create();
	$scope.fleetBoard = Board.create();

	console.log('Controller ===  GameCtrl');

	$scope.clickedCell = function(cell) {
		cell.shot = true;
		if (cell.ship === true){
			cell.hit = true;
		} else {
			cell.miss = true;
		}
		console.log(cell);
	};
	$scope.msg = ''
	$scope.chatForm = {}
  $scope.messages = []

  $scope.chatForm.sendChat = function(msg){
  	console.log('chat send button hit');
    WarSocket.emit('sendmessage', msg);
    msg;
  };

  WarSocket.on('sendmessage', function (msg){
    console.log('message sent');
    io.emit('receivemessage', msg);
    $scope.msg = ' '
  });

  WarSocket.on('receivemessage', function (msg){
    console.log("got message", msg);
    $scope.messages.unshift(msg);
  });

}]);


/*-----  End of Controller = Game  ------*/ 




app.factory('Board', ['Cell', function (Cell){

	'use strict';
	console.log("calling Board function")

	return {
		create: function(y, x) {
			var board = {
				rows: []
			}
			// create a table of 100 cells
			for (var row = 0; row < 10; row++) {
				for (var col = 0; col < 10; col++) {
					if (!board.rows[row]) {
						board.rows[row] = []
					}
					board.rows[row][col] = Cell.create(row,col);
				}
			}

			console.log("board returned!")
			return board;
			
		}
	}
}]);
 

/*================================================================
=>                   Service = cell
==================================================================*/
/*global app*/

app.factory('Cell', function (){

	'use strict';
	console.log("calling Cell function")
 
	return {
		create: function(y, x) {
			var cell = {
			  x: x,
			  y: y,
			  shot: false, // cell was fired on
			  ship: false, // cell has a ship on it
			  hit: false, // ship occupying this cell has been hit
			  miss: false // cell was shot but had no ship
			}
			return cell;
			console.log("cell returned!")
		}
	}
});


/*-----  End of Service = cell  ------*/


// /*================================================================
// =>                   Factory = cell
// ==================================================================*/
// /*global app*/




/*-----  End of Factory = cell  ------*/
app.factory('WarSocket', function (socketFactory){
  return socketFactory({
    ioSocket: io.connect('http://localhost:3000')
  });
});
