
/*================================================================
=>                  Controller = Game
==================================================================*/
/*global app*/

app.controller('GameCtrl', ['$scope', '$timeout', '$cookieStore', '$rootScope', 'Board', 'WarSocket', 'User', 'Ship', 'Game', 'Cell', function ($scope, $timeout, $cookieStore, $rootScope, Board, WarSocket, User, Ship, Game, Cell) {
  'use strict';

  var user = User.get();
  $scope.user = user;
  $scope.user = $cookieStore.get('username');
  var active_user = false;
  var hp = 20;

  var game = Game.get();
  $scope.fleetBoard = Board.create();
  $scope.radarBoard = Board.create();

  $scope.selfSetup = true;

  $scope.ships = {
    frigate: Ship.create("frigate", 3),
    corvette: Ship.create("corvette", 2),
    destroyer: Ship.create("destroyer", 4),
    cruiser: Ship.create("cruiser", 5),
    carrier: Ship.create("carrier", 6)
  };

  // disable draggable on Ready, notify opponent
  $scope.setup = {}
  $scope.setup.ready = function(){
    console.log('ready button hit');
    $scope.selfSetup = false;
    if ($scope.waitEnemySetup !== false){
      $scope.waitEnemySetup = true;
    };
    WarSocket.emit('player ready');
  };

  // notify player when opponent is ready
  WarSocket.on('opponent ready', function(){
    $scope.waitEnemySetup = false;
    if ($scope.selfSetup === false){
      active_user = true;
      $scope.turnAlert = true;
      WarSocket.emit('active_user set');
      console.log('Your turn, ' + $scope.user.username);
    };
  });

  // if active_user assigned to opponent, show waitAlert
  WarSocket.on('Wait', function(){
    if (!$scope.gameOver){
      $scope.waitAlert = true;
    };
  });
  
  // active_user assigned
  WarSocket.on('Your turn', function(){
    if (!$scope.gameOver){
      active_user = true;
      $scope.turnAlert = true;
      $scope.waitAlert = false;
    };
    console.log('Your turn, ' + $scope.user.username);
  });

  // checks if click performed by active_user & unclicked cell clicked
  $scope.check = function(cell){
    var my_cell = $scope.radarBoard.getCell(cell.row, cell.col);
    if ($scope.selfSetup || $scope.waitEnemySetup){
      console.log('shot aborted - setup in progress')
      return;
    };
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
    } else if (!$scope.gameOver){
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
  // if gameOver, notify winner
  WarSocket.on('shot', function (cell){
    console.log('Incoming shot!!!')
    var my_cell = $scope.fleetBoard.getCell(cell.row, cell.col);
    console.log(my_cell);
    if (my_cell.ship === true){
      my_cell.hit = true;
      hp -= 1;
      if (hp === 0){
        $scope.gameOver = true;
        $scope.waitAlert = false;
        $scope.turnAlert = false;
        $scope.loser = true;
        WarSocket.emit('game over');
      };
      console.log('Hit!');
      console.log('You now have ' + hp + 'HP left!');
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
    if (!$scope.gameOver){
      $scope.waitAlert = true;
    };
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

  WarSocket.on('winner', function(){
    $scope.gameOver = true;
    $scope.turnAlert = false;
    $scope.waitAlert = false;
    $scope.winner = true;
  });

  // chat feature 
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



