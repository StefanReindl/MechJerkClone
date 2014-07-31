 function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("Text");
      var scope = angular.element($("#"+data)).scope();
      var ship = scope.ships[data];
      console.log(ship)

      ev.target.appendChild(document.getElementById(data));
    }