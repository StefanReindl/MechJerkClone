
/*================================================================
=>                  Controller = User
==================================================================*/
/*global app*/

app.controller('UserCtrl', ['$scope', 'User', function ($scope, User) {

	'use strict';

	console.log('Controller ===  UserCtrl');

	// $scope.users = []
	$scope.userEnter = {}
	$scope.username = ''

	$scope.userEnter.enterName = function(username){
  	console.log('start button hit');
    $scope.user = User.create(username);
    // $scope.users.push(user);
  };


}]);


/*-----  End of Controller = User  ------*/



