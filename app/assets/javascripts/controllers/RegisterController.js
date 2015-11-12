app.controller('RegisterController', ['$scope', '$window', 'register', 'ROUTES', 'current_user', function($scope, $window, register, ROUTES, current_user) {
  $scope.header = $('.header h1');
  $scope.header.html('Register');
  console.log(current_user)
  $scope.company_id = current_user.company_id;
  $scope.fuse_id = current_user.fuse_id;
  $scope.email = ''
  $scope.username = ''
  $scope.fuse_id = ''
  
  $scope.submit = function() {
    current_user.email = $scope.email;
    current_user.username = $scope.username;
    current_user.fuse_id = parseInt($scope.fuse_id);
    current_user.update_attributes(current_user)
    register.getJSONData().success(function(data) {
      current_user.update_attributes(data);
      $window.location.href = '#/inbox';
    })
    .error(function(err) {
      console.log(err);
    });  
  }
}]);