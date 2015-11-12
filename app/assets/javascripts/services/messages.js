app.factory('MessageFactory', ['$http', 'ROUTES', 'current_user', '$rootScope', function($http, ROUTES, current_user, $rootScope) {

  var factory = {};
  factory.messages_list = [];
  factory.fetch = function(id) {
    console.log(current_user)
    console.log(current_user.to_params())
    return $http.get(ROUTES.BASE_URL + '/conversations/' + String(id) + '/messages?' + current_user.to_params(), {cache: false})
          .success(function(data) {
            console.log('success');
            return data;
          })
          .error(function(err) {
            return err;
          });
  }
  factory.update_messages = function(_messages_) {
    factory.messages_list = factory.messages_list.concat(_messages_);

    console.log(factory.messages_list)
  }
  factory.addMessage = function(_message_) {
    factory.messages_list = factory.messages_list.unshift(_message_)
  }
  factory.getMessages = function() {
    return factory.messages_list;
  }()
  factory.openSubscriptionChannel = function(conversation_id) {
    console.log('Subscribing to \'conversation_'+String(conversation_id)+'\'')
    $rootScope.socketio.on('conversation_'+String(conversation_id), function(data) {
      factory.update_messages(data);
      console.log('***MESSAGE RECEIVED*** ' + data['username'] + ': ' + data['message']);
    });
  }
  factory.sendMessage = function(conversation_id, message, username) {
    console.log('Sending message to \'message_to_conversation_server\'')
    $rootScope.socketio.emit('message_to_conversation_server', { conversation_id: conversation_id, message: message, username: username });
  }

  return factory;
}]);