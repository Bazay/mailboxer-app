app.controller('InboxController', ['$scope', '$window', 'conversations', function($scope, $window, conversations) {
  $scope.header = $('.header h1');
  $scope.header.html('Inbox')
  conversations.success(function(data) {
    $scope.conversations = data;
    $scope.backButton = $('.back-button');
    $scope.backButton.removeClass('show');
    $scope.signOutButton = $('.signout-button');
    $scope.signOutButton.addClass('show');
  });  
  $scope.signOut = function() {
    $rootScope.current_user = undefined;
    $window.location.href = '#/';
  };
}]);