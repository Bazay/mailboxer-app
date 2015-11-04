app.controller('InboxController', ['$scope', 'conversations', function($scope, conversations, ROUTES, current_user) {
  $scope.header = $('.header h1');
  $scope.header.html('Inbox')
  conversations.success(function(data) {
    $scope.conversations = data;
    console.log($scope.conversations);
    $scope.backButton = $('.back-button');
    $scope.backButton.removeClass('show');
  });  
}]);