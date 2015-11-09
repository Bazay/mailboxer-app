app.directive('message', function($rootScope) {
  console.log($rootScope.current_user);
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    templateUrl: 'assets/directives/message.html',
    link: function(scope, element, attrs) {
      scope.current_user = function() {
        return $rootScope.current_user
      }
    }
  }
});