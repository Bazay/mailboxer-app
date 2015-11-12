app.factory('register', ['$http', 'ROUTES', 'current_user', function($http, ROUTES, current_user) {
  return {
    getJSONData: function() {
      return $http.post(ROUTES.BASE_URL + '/sessions?' + current_user.to_params())
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
    }
  }
}]);