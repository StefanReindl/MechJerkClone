
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



