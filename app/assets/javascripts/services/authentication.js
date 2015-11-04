app.factory('conversations', ['$http', 'rootUrl', function($http, $routeUrl) {
  return $http.get(routeUrl + '/users/new')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);