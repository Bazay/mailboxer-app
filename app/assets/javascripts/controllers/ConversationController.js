app.controller('ConversationController', ['$scope', 'MessageFactory', '$http', '$routeParams', 'ROUTES', 'current_user', '$window', function($scope, MessageFactory, $http, $routeParams, ROUTES, current_user, $window) {
  $scope.header = $('.header h1');
  
  $scope.messages = function() { 
    return MessageFactory.messages_list;
  };
  MessageFactory.openSubscriptionChannel($routeParams.id);
  MessageFactory.fetch($routeParams.id)
  .success(function(data) {
    if (MessageFactory.getMessages()[0].conversation_recipients.split(',').length > 2) {
      $scope.header.html(MessageFactory.getMessages()[0].conversation.subject);
    } else {
      $scope.header.html(MessageFactory.getMessages()[0].conversation_recipients);
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
        MessageFactory.sendMessage($routeParams.id, message);
        $textarea.val('');
      })
    }
  }
}]);