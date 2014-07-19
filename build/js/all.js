
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

	$scope.board = Board.create();

	console.log('Controller ===  GameCtrl');

	$scope.clickedCell = function(cell) {
		cell.shot = !cell.shot;
		console.log(cell);
	};

  $scope.messages = []

  WarSocket.on('receivemessage', function(msg){
    console.log("got message", msg);
    $scope.messages.push(msg);
  });


}]);


/*-----  End of Controller = Game  ------*/ 




app.factory('Board', ['Cell', function (Cell){

	'use strict';
	console.log("calling Board function")

	return {
		create: function(x, y) {
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
		create: function(x, y) {
			var cell = {
			  x: x,
			  y: y,
			  shot: false, // cell was fired on
			  hit: false    // cell returned a hit
			  // board_type: board_type;
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
