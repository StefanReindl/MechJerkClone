
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', '$cookieStore', '$rootScope', 'Board', 'WarSocket', 'User', 'Game', function ($scope, $cookieStore, $rootScope, Board, WarSocket, User, Game) {
  'use strict';

  var user = User.get();
  $scope.user = user;
  var game = Game.get();

	user.name = $cookieStore.get('username');
	console.log($cookieStore);

	$scope.fleetBoard = Board.create();
	$scope.radarBoard = Board.create();

	$scope.clickedCell = function(cell) {
		cell.shot = true;
		WarSocket.emit('shot', cell);
		console.log('shot fired on ' + cell);
	};

	WarSocket.on('shot', function (cell){
		console.log('Shot recieved by enemy')
		if (fleetBoard.cell.ship === true){
			fleetBoard.cell.hit = true;
			console.log('Hit!')
			WarSocket.emit('hit', cell);
		} else {
			fleetBoard.cell.miss = true;
			console.log('Miss!')
			WarSocket.emit('miss', cell);
		};
	});

	WarSocket.on('hit', function (cell){
		radarBoard.cell.hit = true;
		console.log('Ship hit at ' + cell.x + cell.y);
	});

	WarSocket.on('miss', function (cell){
		radarBoard.cell.miss = true;
		console.log('Turkey giblets')
	});

	$scope.chatForm = {}
	$scope.msg = ''
  $scope.messages = []

  $scope.chatForm.sendChat = function(msg){
  	console.log('chat send button hit');
    console.log(user + ' send message: ' + msg);

    var message = {
      username: user.name,
      content: msg
    };

    WarSocket.emit('sendmessage', message);
    msg;
  };

  WarSocket.on('sendmessage', function (msg){
    console.log('message sent');
    io.emit('receivemessage', msg);
  });	

  WarSocket.on('receivemessage', function (message){
    console.log("got message");
    console.log(message);

    $scope.messages.push(message);
    $scope.msg = ''
    var chatWindow = document.getElementsByClassName("chat");
    chatWindow[0].scrollTop = chatWindow[0].scrollHeight;
  });

}]);


/*-----  End of Controller = Game  ------*/ 



