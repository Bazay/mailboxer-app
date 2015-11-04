app.directive('message', function(current_user) {
  console.log(current_user);
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    templateUrl: 'assets/directives/message.html',
    link: function(scope, element, attrs) {
      scope.current_user = function() {
        return current_user
      }
    }
  }
});