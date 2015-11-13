app.factory('MessageFactory', ['$http', 'ROUTES', 'current_user', '$rootScope', function($http, ROUTES, current_user, $rootScope) {

  var factory = {};
  factory.messages_list = [];
  factory.fetch = function(id) {
    console.log(current_user.attributes())
    console.log(current_user.to_params())
    return $http.get(ROUTES.BASE_URL + '/conversations/' + String(id) + '/messages?' + current_user.to_params(), {cache: false})
          .success(function(data) {
            console.log('success');
            factory.update_messages(data);
            return data;
          })
          .error(function(err) {
            return err;
          });
  }
  factory.update_messages = function(_messages_) {
    return factory.messages_list = factory.messages_list.concat(_messages_);
  }
  factory.addMessage = function(_message_) {
    factory.messages_list.unshift(_message_)
    console.log(factory.getMessages())
  }
  factory.getMessages = function() {
    return factory.messages_list;
  }
  factory.openSubscriptionChannel = function(conversation_id) {
    console.log('Subscribing to \'conversation_'+String(conversation_id)+'\'')
    $rootScope.socketio.on('conversation_'+String(conversation_id), function(data) {
      console.log(data)
      factory.addMessage(data);
      $rootScope.$apply();
      console.log('***MESSAGE RECEIVED*** ' + data['sender']['username'] + ': ' + data['body']);
    });
  }
  factory.sendMessage = function(conversation_id, message) {
    console.log('Sending message to \'message_to_conversation_server\'')
    pack = {
      body: message,
      sender: current_user.attributes(),
      created_at: new Date,
      conversation_id: conversation_id
    }
    $rootScope.socketio.emit('message_to_conversation_server', pack);
  }

  return factory;
}]);