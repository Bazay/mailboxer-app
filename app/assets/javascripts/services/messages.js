app.factory('messages', ['$http', 'ROUTES', 'current_user', '$routeParams', function($http, ROUTES, current_user, $routeParams) {
  return $http.get(ROUTES.BASE_URL + '/conversations/' + String($routeParams.id) + '/messages?' + current_user.to_params)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);