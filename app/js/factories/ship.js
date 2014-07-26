var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function($scope, $timeout) {
  $scope.board = [];
 
  
  $scope.list5 = [
    { 'title': 'USS Z', 'drag': true },
    { 'title': 'USS W', 'drag': true },
    { 'title': 'USS S', 'drag': true },
    { 'title': 'USS M', 'drag': true },
    { 'title': 'USS V', 'drag': true },
    { 'title': 'USS P', 'drag': true },
    { 'title': 'USS T', 'drag': true },
    { 'title': 'USS A', 'drag': true }
  ];

  // Limit items to be dropped in list1
  $scope.optionsBoard = {
    accept: function(dragEl) {
      if ($scope.board.length >= 20) {
        return false;
      } else {
        return true;
      }
    }
  };
});