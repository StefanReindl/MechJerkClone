app.factory('User', function (){

	'use strict';
	console.log("calling User function")

	var user;
 
	return {
		create: function(username) {
			user = {
			  name: username
			}
			console.log("user returned!")
			return user;
		},
		get: function(){
			return user;
		}
	}
});