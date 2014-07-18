
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', 'Board', function ($scope, Board) {
	$scope.board = Board.create();


	'use strict';

	console.log('Controller ===  GameCtrl');

	$scope.clickedCell = function(cell) {
		cell.hit = !cell.hit;
		console.log(cell);
	};
}]);


/*-----  End of Controller = Game  ------*/



