app.factory('current_user', ['$rootScope', function($rootScope) {
  if ($rootScope.current_user == undefined) {
    console.log(true)
    var id, fuse_id, username, email, company_id;

    var user = {
      id: null,
      fuse_id: 24,
      username: null,
      email: null,
      company_id: null
    }

    $rootScope.current_user = user
  } else {
    console.log(false)
  }


  return {
    id: $rootScope.current_user.id,
    fuse_id: $rootScope.current_user.fuse_id,
    username: $rootScope.current_user.username,
    email: $rootScope.current_user.email,
    company_id: $rootScope.current_user.company_id,
    to_params: function() {
      return 'user[id]='+String($rootScope.current_user.id)+'&user[fuse_id]='+String($rootScope.current_user.fuse_id)+'&user[username]='+String($rootScope.current_user.username)+'&user[email]='+String($rootScope.current_user.email)+'&user[company_id]='+String($rootScope.current_user.company_id)
    },
    update_attributes: function(data) {
      $rootScope.current_user.id = data.id;
      $rootScope.current_user.username = data.username;
      $rootScope.current_user.email = data.email;

      return $rootScope.current_user;
    }
  }
}]);