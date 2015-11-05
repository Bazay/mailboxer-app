app.factory('register', ['$http', 'ROUTES', 'current_user', 'current_user_params', function($http, ROUTES, current_user, current_user_params) {
  console.log(current_user)
  return $http.post(ROUTES.BASE_URL + '/sessions?' + current_user_params)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);