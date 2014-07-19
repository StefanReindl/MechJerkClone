
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

  $scope.messages = []

  WarSocket.on('receivemessage', function(msg){
    console.log("got message", msg);
    $scope.messages.push(msg);
  });


}]);


/*-----  End of Controller = Game  ------*/ 



