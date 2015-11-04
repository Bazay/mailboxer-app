app.directive('conversation', function() {
  return {
    restrict: 'E',
    scope: {
      conversation: '='
    },
    templateUrl: 'assets/directives/conversation.html'
  }
});