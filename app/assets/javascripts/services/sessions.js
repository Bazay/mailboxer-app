app.factory('sessions', ['$http', 'ROUTES', 'current_user', function($http, ROUTES, current_user) {
  return $http.get(ROUTES.BASE_URL + '/sessions/new?user[fuse_id]=' + current_user.fuse_id)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);