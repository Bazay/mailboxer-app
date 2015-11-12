app.service('messages', ['$http', 'ROUTES', 'current_user', '$rootScope', function($http, ROUTES, current_user, $rootScope) {
  return {
    openSubscriptionChannel: function(conversation_id) {
      console.log('Subscribing to \'conversation_'+String(conversation_id)+'\'')
     $rootScope.socketio.on('conversation_'+String(conversation_id), function(data) {
        console.log('***MESSAGE RECEIVED*** ' + data['username'] + ': ' + data['message']);
      });
    },
    sendMessage: function(conversation_id, message, username) {
      console.log('Sending message to \'message_to_conversation_server\'')
      $rootScope.socketio.emit('message_to_conversation_server', { conversation_id: conversation_id, message: message, username: username });
    },
    getJSONData: function(id) {
      console.log(current_user)
      console.log(current_user.to_params())
      return $http.get(ROUTES.BASE_URL + '/conversations/' + String(id) + '/messages?' + current_user.to_params(), {cache: false})
            .success(function(data) {
              console.log('success')
              return data;
            })
            .error(function(err) {
              return err;
            });
    }
  }
}]);