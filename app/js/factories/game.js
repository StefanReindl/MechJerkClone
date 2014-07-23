
/*================================================================
=>                   Factory = game
==================================================================*/
/*global app*/

app.factory('Game', function () {

	'use strict';

	// You can write some code here
  var game;

	return {
    create : function (username) {
    	console.log('game creation begun')
      game = {
	      player1: username
	    }
      console.log('Game created, player1 assigned to ' + username);
      
    	return game;	
    },
    get: function(){
      return game;
    }
	};
});


/*-----  End of Factory = game  ------*/