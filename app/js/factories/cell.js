
/*================================================================
=>                   Service = cell
==================================================================*/
/*global app*/

app.factory('Cell', function (){

	'use strict';
	console.log("calling Cell function")
 
	return {
		create: function(y, x) {
			var cell = {
			  x: x,
			  y: y,
			  shot: false, // cell was fired on
			  ship: false, // cell has a ship on it
			  hit: false, // ship occupying this cell has been hit
			  miss: false // cell was shot but had no ship
			}
			return cell;
			console.log("cell returned!")
		}
	}
});


/*-----  End of Service = cell  ------*/


// /*================================================================
// =>                   Factory = cell
// ==================================================================*/
// /*global app*/




/*-----  End of Factory = cell  ------*/