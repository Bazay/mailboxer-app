app.factory('conversations', ['$http', 'ROUTES', 'current_user', function($http, ROUTES, current_user) {
  return $http.get(ROUTES.BASE_URL + '/conversations?' + current_user_params)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);