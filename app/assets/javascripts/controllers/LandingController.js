app.controller('LandingController', ['$scope', '$window', 'sessions', 'ROUTES', 'current_user', function($scope, $window, sessions, ROUTES, current_user) {
  $scope.header = $('.header h1');
  $scope.header.html('Fuse Chat');
  sessions.success(function(data) {
    console.log(data.user);
    current_user = current_user.update_attributes(data.user);
    console.log(current_user);
    $window.location.href = '#/inbox';

  })
  .error(function() {
    $window.location.href = '#/register';
  });
}]);