
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', '$cookieStore', '$rootScope', 'Board', 'WarSocket', 'User', 'Game', 'Cell', function ($scope, $cookieStore, $rootScope, Board, WarSocket, User, Game, Cell) {
  'use strict';

  var user = User.get();
  $scope.user = user;
  var game = Game.get();

	$scope.user = $cookieStore.get('username');

	$scope.fleetBoard = Board.create();
	$scope.radarBoard = Board.create();

	// activeplayer makes shot
	$scope.clickedCell = function(cell) {
		cell.shot = true;
		WarSocket.emit('shot', cell);
		console.log('shot fired on ' + cell);			
	};

	// check if shot from activeplayer is hit/miss, show on fleetBoard
	WarSocket.on('shot', function (cell){
		console.log('Incoming shot!!!')
		var my_cell = $scope.fleetBoard.getCell(cell.row, cell.col);
		console.log(my_cell);
		if (my_cell.ship === true){
			my_cell.hit = true;
			console.log('Hit!');
			WarSocket.emit('hit', cell);
		} else {
			my_cell.miss = true;
			console.log('Miss!');
			WarSocket.emit('miss', cell);
		};
	});

	// show hit on activeplayer's radarBoard
	WarSocket.on('hit', function (cell){
		$scope.radarBoard.getCell(cell.row, cell.col).hit = true;
		console.log('Ship hit at ' + cell.x + ', ' + cell.y);
	});

	// show miss on activeplayer's radarBoard
	WarSocket.on('miss', function (cell){
		$scope.radarBoard.getCell(cell.row, cell.col).miss = true;
		console.log('Turkey giblets');
	});

	$scope.chatForm = {}
	$scope.msg = ''
  $scope.messages = []
  

  $scope.chatForm.sendChat = function(msg){
  	console.log('chat send button hit');
    console.log($scope.user + ' send message: ' + msg);

    var message = {
      username: $scope.user.username,
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



