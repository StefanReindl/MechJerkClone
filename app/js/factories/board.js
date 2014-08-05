app.factory('Board', ['Cell', function (Cell){

  'use strict';
  console.log("calling Board function")

  return {
    create: function(row, col) {
      var board = {
        rows: [],
        getCell: function(row, col) {
          return this.rows[row][col];
        },
        shipDrop: function(ship, cell){
            console.log(ship.cells.length)
          if (ship.cells.length > 0) {
            for (var i = 0; i < ship.length; i++){
              ship.cells[i].ship = false
            };
            ship.cells = [];
          }
          var col = cell.col;
          var row = cell.row;
          for (var i = col; i < col + ship.length; i++){
            var cell = this.getCell(row, i);
            // console.log(cell);
            cell.ship = true
            ship.cells.push(cell);
          };
          
          // console.log(cell + "full-house")
          console.log("Warren ! row:" + row + ", col: " + col);
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
 