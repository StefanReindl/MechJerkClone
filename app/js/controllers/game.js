
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', 'Board', 'WarSocket', 'User', function ($scope, Board, WarSocket, User) {
  'use strict';

	$scope.radarBoard = Board.create();
	$scope.fleetBoard = Board.create();

	$scope.clickedCell = function(cell) {
		cell.shot = true;
		if (cell.ship === true){
			cell.hit = true;
		} else {
			cell.miss = true;
		}
		console.log(cell);
	};

	$scope.chatForm = {}
	$scope.msg = ''
  $scope.messages = []

  $scope.chatForm.sendChat = function(msg){
  	console.log('chat send button hit');
    WarSocket.emit('sendmessage', msg);
    msg;
  };

  WarSocket.on('sendmessage', function (msg){
    console.log('message sent');
    io.emit('receivemessage', msg);
  });

  WarSocket.on('receivemessage', function (msg){
    console.log("got message", msg);
    $scope.messages.push(msg);
    $scope.msg = ''
    var chatWindow = document.getElementsByClassName("chat");
    chatWindow[0].scrollTop = chatWindow[0].scrollHeight;
  });

}]);


/*-----  End of Controller = Game  ------*/ 



