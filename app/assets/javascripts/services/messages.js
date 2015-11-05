app.factory('messages', ['$http', 'ROUTES', 'current_user', 'current_user_params', '$routeParams', function($http, ROUTES, current_user, current_user_params, $routeParams) {
  return $http.get(ROUTES.BASE_URL + '/conversations/' + String($routeParams.id) + '/messages?' + current_user_params)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);