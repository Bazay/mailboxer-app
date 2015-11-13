app.controller('LandingController', ['$scope', '$window', 'sessions', 'ROUTES', 'current_user', '$rootScope', function($scope, $window, sessions, ROUTES, current_user, $rootScope) {
  $rootScope.socketio = io.connect('http://fuse-chat-node.herokuapp.com:1337');
  $scope.header = $('.header h1');
  $scope.header.html('Fuse Chat');
  sessions.getJSONData().success(function(data) {
    current_user = current_user.update_attributes(data.user);
    $window.location.href = '#/inbox';
  })
  .error(function() {
    $window.location.href = '#/register';
  });
}]);