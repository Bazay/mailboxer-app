app.controller('HomeController', ['$scope', function($scope, conversations, current_user) {
  if (current_user) {
    window.location('#/inbox')
  }
  $scope.registration_form = $('#registration_form');
  $scope.backButton = $('.back-button');
  $scope.backButton.removeClass('show');
}]);