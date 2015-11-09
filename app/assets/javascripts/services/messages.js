app.service('messages', ['$http', 'ROUTES', 'current_user', '$routeParams', function($http, ROUTES, current_user) {
  return {
    getJSONData: function(id) {
      return $http.get(ROUTES.BASE_URL + '/conversations/' + String(id) + '/messages?' + current_user.to_params(), {cache: false})
            .success(function(data) {
              console.log('success')
              return data;
            })
            .error(function(err) {
              return err;
            });
    }
  }
}]);