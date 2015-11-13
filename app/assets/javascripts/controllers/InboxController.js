app.controller('InboxController', ['$scope', '$window', 'conversations', '$rootScope', function($scope, $window, conversations, $rootScope) {
  $scope.header = $('.header h1');
  $scope.header.html('Inbox')
  console.log($rootScope.current_user)
  console.log($rootScope)
  conversations.success(function(data) {
    $scope.conversations = data;
    $scope.backButton = $('.back-button');
    $scope.backButton.removeClass('show');
    $scope.signOutButton = $('.signout-button');
    $scope.signOutButton.addClass('show');
  });  
  // $rootScope.signOut = function() {
  //   delete $rootScope.current_user;
  //   $window.location.href = '#/';
  // };
}]);