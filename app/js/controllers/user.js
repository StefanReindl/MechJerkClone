
/*================================================================
=>                  Controller = User
==================================================================*/
/*global app*/

app.controller('UserCtrl', ['$scope', '$cookieStore', 'User', 'WarSocket', 'Game', function ($scope, $cookieStore, User, WarSocket, Game) {

	'use strict';

	console.log('Controller ===  UserCtrl');

	$scope.username = ''
	$scope.userEnter = {}

	$scope.userEnter.enterName = function(username){
		console.log('start button hit');
    $scope.user = User.create(username);
    WarSocket.emit('username', username);
    $cookieStore.put('username', $scope.user);
    console.log('user created');
		WarSocket.emit('startgame', username);
  };

	WarSocket.on('creategame', function (username){
  	$scope.game = Game.create(username);
  	console.log('game created! user is player1');
	});  	

	WarSocket.on('game in progress', function (username){
		console.log('Player2 joined');
	});

}]);


/*-----  End of Controller = User  ------*/



