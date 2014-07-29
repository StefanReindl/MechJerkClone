app.factory('Ship', function () {

  'use strict';

  var ship = Ship.get();
    $scope.ships = {
    frigate: Ship.create("frigate", 3),
    corvette: Ship.create("corvette", 2),
    destroyer: Ship.create("destroyer", 4),
    cruiser: Ship.create("cruiser", 5),
    carrier: Ship.create("carrier", 6)
  };

  return{
    create : function (name, length) {
      ship = {
        name: name,
        length: length
      }
      return ship;
    },
    get: function(){
      return ship;
    }
  };
});