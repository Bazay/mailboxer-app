app.controller('LandingController', ['$scope', '$window', 'sessions', 'ROUTES', 'current_user', function($scope, $window, sessions, ROUTES, current_user) {
  $scope.header = $('.header h1');
  $scope.header.html('Fuse Chat');
  sessions.success(function(data) {
    current_user = data;
    console.log(data)
    $window.location.href = '#/inbox';
  })
  .error(function() {
    $window.location.href = '#/register';
  });
}]);