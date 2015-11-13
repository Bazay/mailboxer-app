app.controller('RegisterController', ['$scope', '$window', 'register', 'ROUTES', 'current_user', '$rootScope', function($scope, $window, register, ROUTES, current_user, $rootScope) {
  $scope.header = $('.header h1');
  $scope.header.html('Register');
  console.log(current_user)
  $scope.company_id = current_user.company_id();
  $scope.fuse_id = current_user.fuse_id();
  $scope.email = ''
  $scope.username = ''
  
  $scope.submit = function() {
    $rootScope.current_user.email = $scope.email;
    $rootScope.current_user.username = $scope.username;
    register.getJSONData().success(function(data) {
      current_user.update_attributes(data);
      $window.location.href = '#/inbox';
    })
    .error(function(err) {
      console.log(err);
    });  
  }
}]);