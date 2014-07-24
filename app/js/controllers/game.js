
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/



app.controller('GameCtrl', ['$scope', '$cookieStore', '$rootScope', 'Board', 'WarSocket', 'User', 'Game', 'Cell', function ($scope, $cookieStore, $rootScope, Board, WarSocket, User, Game, Cell) {
  'use strict';

  var user = User.get();
  $scope.user = user;
  var game = Game.get();
  var active_user = false;

	$scope.user = $cookieStore.get('username');

	$scope.fleetBoard = Board.create();
	$scope.radarBoard = Board.create();


	// checks if click performed by active_user
	$scope.check = function(cell){
		console.log('checking if active_user');
		console.log(cell);
		if (active_user) {
			$scope.clickedCell(cell);
		};
	};

	// active_user makes shot
	WarSocket.on('Your turn', function(){
		active_user = true;
		console.log('Your turn, ' + $scope.user.username);
	});

	$scope.clickedCell = function(cell) {
		cell.shot = true;
		WarSocket.emit('shot', cell);
		console.log('shot fired on ' + cell);			
	};

	// check if shot from active_user is hit/miss, show on fleetBoard
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

	// show hit on active_user's radarBoard
	WarSocket.on('hit', function (cell){
		$scope.radarBoard.getCell(cell.row, cell.col).hit = true;
		WarSocket.emit('turn complete');
		active_user = false;
		console.log('Ship hit at ' + cell.x + ', ' + cell.y);
	});

	// show miss on active_user's radarBoard
	WarSocket.on('miss', function (cell){
		$scope.radarBoard.getCell(cell.row, cell.col).miss = true;
		WarSocket.emit('turn complete');
		active_user = false;
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



