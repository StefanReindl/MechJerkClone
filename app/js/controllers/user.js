
/*================================================================
=>                  Controller = User
==================================================================*/
/*global app*/

app.controller('UserCtrl', ['$scope', 'User', function ($scope, User) {

	'use strict';

	$scope.users = []
	$scope.userEnter = {}
	$scope.username = ''

	$scope.userEnter.enterName = function(username){
  	console.log('start button hit');
    $scope.user = User.create();
    $scope.users.push($scope.user);
  };


	console.log('Controller ===  UserCtrl');
}]);


/*-----  End of Controller = User  ------*/



