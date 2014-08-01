angular.module('battleship')

.directive('onFinishRender', function ($timeout) {
     console.log('hairy armpits')
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
});   