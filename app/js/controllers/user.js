
/*================================================================
=>                  Controller = User
==================================================================*/
/*global app*/

app.controller('UserCtrl', ['$scope', function ($scope) {

	'use strict';

	$scope.username = []
	$scope.userName = {}

	$scope.userName.enterName = function(username){
  	console.log('start button hit');
    $scope.user = User.create();
  };


	console.log('Controller ===  UserCtrl');
}]);


/*-----  End of Controller = User  ------*/



