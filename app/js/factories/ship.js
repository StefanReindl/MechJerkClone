app.factory('Ship', function () {

  'use strict';

  var ship;

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