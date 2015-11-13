app.factory('current_user', ['$rootScope', function($rootScope) {
  if ($rootScope.current_user == undefined) {
    console.log(true)
    var id, fuse_id, username, email, company_id;

    var user = {
      id: null,
      // fuse_id: parent.gon.current_user.id,
      fuse_id: null,
      username: null,
      email: null,
      // company_id: parent.gon.current_company.id,
      // avatar_url: parent.gon.current_user.avatar_url
      company_id: 1,
      avatar_url: 'https://fusion.fusion-universal.com/media/W1siZiIsIjIwMTUvMDcvMTUvMTAvMjIvMTQvNjY0LzExMTMzODEyXzEwMTUzMjU3NjY4OTEwOTk2XzYwMjkwOTI2Nzg0Mzk2MzA0NThfbi5qcGciXSxbInAiLCJ0aHVtYiIsIjQyeDQyIyJdXQ?sha=55c56fdb'
    }

    $rootScope.current_user = user
  } else {
    console.log(false)
  }

  var id = function() { return $rootScope.current_user.id },
  fuse_id = function() { return $rootScope.current_user.fuse_id },
  username = function() { return $rootScope.current_user.username },
  email = function() { return $rootScope.current_user.email },
  company_id = function() { return $rootScope.current_user.company_id },
  avatar_url = function() { return $rootScope.current_user.avatar_url };


  return {
    id: function() { id() },
    fuse_id: function() { fuse_id() },
    username: function() { username() },
    email: function() { email() },
    company_id: function() { company_id() },
    avatar_url: function() { avatar_url() },
    to_params: function() {
      return 'user[id]='+String($rootScope.current_user.id)+'&user[fuse_id]='+String($rootScope.current_user.fuse_id)+'&user[username]='+String($rootScope.current_user.username)+'&user[email]='+String($rootScope.current_user.email)+'&user[company_id]='+String($rootScope.current_user.company_id)
    },
    attributes: function() {
      return {
        id: id(),
        fuse_id: fuse_id(),
        username: username(),
        email: email(),
        company_id: company_id(),
        avatar_url: avatar_url()
      }
    },
    update_attributes: function(data) {
      $rootScope.current_user.id = data.id;
      $rootScope.current_user.fuse_id = data.fuse_id;
      $rootScope.current_user.username = data.username;
      $rootScope.current_user.email = data.email;
      $rootScope.current_user.company_id = data.company_id;
      $rootScope.current_user.avatar_url = data.avatar_url;

      return $rootScope.current_user;
    }
  }
}]);