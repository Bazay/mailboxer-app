app.controller('ConversationController', ['$scope', 'MessageFactory', '$http', '$routeParams', 'ROUTES', 'current_user', '$window', function($scope, MessageFactory, $http, $routeParams, ROUTES, current_user, $window) {
  $scope.header = $('.header h1');

  mf = MessageFactory
  mf.openSubscriptionChannel($routeParams.id);
  mf.fetch($routeParams.id)
  .success(function(data) {
    $scope.messages = mf.getMessages;
    console.log(mf.getMessages)
    if ($scope.messages[0].conversation_recipients.split(',').length > 2) {
      $scope.header.html($scope.messages[0].conversation.subject);
    } else {
      $scope.header.html($scope.messages[0].conversation_recipients);
    }
  })
  .error(function(err){
    alert('There was an error: ' + err);
    $window.location.href = '#/inbox';
  });  
  $scope.backButton = $('.back-button');
  $scope.backButton.addClass('show');
  $scope.reply = function() {
      var $textarea = $('#reply-body');
      var message = $textarea.val();
      var json_callback = '&callback=JSON_CALLBACK'
      if (message.length > 0) {
        $http.post(ROUTES.BASE_URL + '/conversations/' + String($routeParams.id) + '/messages?' + current_user.to_params() + '&body=' + message)
        .success(function(){
          messages.sendMessage($routeParams.id, message, current_user.username);
          $textarea.val('');
        })
      }
    }
}]);