app.factory('User', function ($rootScope){

	'use strict';
	console.log("calling User function")
 
	return {
		create: function(username) {
			var id = 1;
			var user = {
				id: id++,
			  name: username
			}
			$rootScope.user = user
			console.log("user returned!")
			return user;
		}
	}
});