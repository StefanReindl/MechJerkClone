
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/

app.controller('GameCtrl', ['$scope', '$timeout', '$cookieStore', '$rootScope', 'Board', 'WarSocket', 'User', 'Game', 'Cell', function ($scope, $timeout, $cookieStore, $rootScope, Board, WarSocket, User, Game, Cell) {
  'use strict';

  var user = User.get();
  $scope.user = user;
  $scope.user = $cookieStore.get('username');
  var active_user = false;

  var game = Game.get();
  $scope.fleetBoard = Board.create();
  $scope.radarBoard = Board.create();

  $scope.waitAlert = true;
  $scope.chooseAgain = false;
  $scope.gameOver = false;

  
  // active_user assigned
  WarSocket.on('Your turn', function(){
    active_user = true;
    $scope.turnAlert = true;
    $scope.waitAlert = false;
    console.log('Your turn, ' + $scope.user.username);
  });

  // checks if click performed by active_user & unclicked cell clicked
  $scope.check = function(cell){
    var my_cell = $scope.radarBoard.getCell(cell.row, cell.col);
    if ($scope.chooseAgain === true){ // this bugfix could use work
      console.log('motherclucker multiclick');
      return;
    };
    if (active_user && my_cell.shot === false) {
      console.log('checking if active_user & shot legal on cell: ' + my_cell)
      $scope.clickedCell(cell);
    } else if (active_user){
      console.log('choose again');
      $scope.chooseAgain = true;
      $timeout(function(){
        $scope.chooseAgain = false;
      }, 1100);
    } else {
      if ($scope.notTurnAlert === true){ // this bugfix could use work
        console.log('notTurnAlert multiclick')
        return;
      };
      $scope.notTurnAlert = true;
      $timeout(function(){
        $scope.notTurnAlert = false;
      }, 1100);
    };
  };

  // active_user selects cell to shoot, cell sent to socket
  $scope.clickedCell = function(cell) {
    cell.shot = true;
    WarSocket.emit('shot', cell);
    console.log('shot fired on ' + cell);     
  };

  // check if shot from active_user is hit/miss, show on fleetBoard
  WarSocket.on('shot', function (cell){
    console.log('Incoming shot!!!')
    var my_cell = $scope.fleetBoard.getCell(cell.row, cell.col);
    console.log(my_cell);
    if (my_cell.ship === true){
      my_cell.hit = true;
      console.log('Hit!');
      WarSocket.emit('hit', cell);
    } else {
      my_cell.miss = true;
      console.log('Miss!');
      WarSocket.emit('miss', cell);
    };
  });

  // show hit on active_user's radarBoard, switch active_user & turn alerts
  WarSocket.on('hit', function (cell){
    $scope.radarBoard.getCell(cell.row, cell.col).hit = true;
    WarSocket.emit('turn complete');
    active_user = false;
    $scope.turnAlert = false;
    $scope.waitAlert = true;
    console.log('Ship hit at ' + cell.row + ', ' + cell.col);
  });

  // show miss on active_user's radarBoard, switch active_user & turn alerts
  WarSocket.on('miss', function (cell){
    $scope.radarBoard.getCell(cell.row, cell.col).miss = true;
    WarSocket.emit('turn complete');
    active_user = false;
    $scope.turnAlert = false;
    $scope.waitAlert = true;
    console.log('Turkey giblets');
  });

  $scope.chatForm = {}
  $scope.msg = ''
  $scope.messages = []
  
  $scope.chatForm.sendChat = function(msg){
    console.log('chat send button hit');
    console.log($scope.user + ' send message: ' + msg);

    var message = {
      username: $scope.user.username,
      content: msg
    };

    WarSocket.emit('sendmessage', message);
    msg;
  };

  WarSocket.on('sendmessage', function (msg){
    console.log('message sent');
    io.emit('receivemessage', msg);
  }); 

  WarSocket.on('receivemessage', function (message){
    console.log("got message");
    console.log(message);
    $scope.messages.push(message);
    $scope.msg = ''
  });

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    console.log('ngRepeatFinished');
    var chatWindow = document.getElementsByClassName("chat");
    chatWindow[0].scrollTop = chatWindow[0].scrollHeight;
  });

}]);


/*-----  End of Controller = Game  ------*/ 



