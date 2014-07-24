app.factory('Board', ['Cell', function (Cell){

	'use strict';
	console.log("calling Board function")

	return {
		create: function(row, col) {
			var board = {
				rows: [],
				getCell: function(row, col) {
					return this.rows[row][col];
				}
			}
			// create a table of 100 cells
			for (var row = 0; row < 10; row++) {
				for (var col = 0; col < 10; col++) {
					if (!board.rows[row]) {
						board.rows[row] = []
					}
					board.rows[row][col] = Cell.create(row,col);
				}
			}

			console.log("board returned!")
			return board;
			
		}
	}
}]);
 