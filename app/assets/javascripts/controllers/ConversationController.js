app.controller('ConversationController', ['$scope', 'messages', '$http', '$routeParams', 'ROUTES', 'current_user', '$window', function($scope, messages, $http, $routeParams, ROUTES, current_user, $window) {
  $scope.header = $('.header h1');
  messages.getJSONData($routeParams.id)
  .success(function(data) {
    console.log('Data:')
    console.log(data)
    $scope.messages = data;
    $scope.header.html($scope.messages[0].conversation_recipients)
    console.log($scope.messages[0].conversation_recipients)
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
          $textarea.val('');
        })
      }
    }
}]);