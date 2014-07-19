
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', 'Board', 'WarSocket', function ($scope, Board, WarSocket) {
  'use strict';
  window.warren = $scope;
	$scope.board = Board.create();

	console.log('Controller ===  GameCtrl');

	$scope.clickedCell = function(cell) {
		cell.hit = !cell.hit;
		console.log(cell);
	};

  $scope.messages = []

  WarSocket.on('receivemessage', function(msg){
    console.log("got message", msg);
    $scope.messages.push(msg);
  });


}]);


/*-----  End of Controller = Game  ------*/



