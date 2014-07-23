
/*================================================================
=>                   Service = cell
==================================================================*/
/*global app*/

app.factory('Cell', function (){

	'use strict';
	console.log("calling Cell function")
 
	return {
		create: function(row, col) {
			var cell = {
			  col: col,
			  row: row,
			  shot: false, // cell was fired on
			  ship: false, // cell has a ship on it
			  hit: false, // ship occupying this cell has been hit
			  miss: false // cell was shot but had no ship
			}
			console.log("cell returned!")
			return cell;
			
		}
	}
});


/*-----  End of Service = cell  ------*/


// /*================================================================
// =>                   Factory = cell
// ==================================================================*/
// /*global app*/




/*-----  End of Factory = cell  ------*/