angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular.module('RepsAppControllers', [])
  .controller('MainCtrl', function($http) {
    this.reps = [];

    this.searchByZip = function(zip) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
        .then(function(res) {
          this.reps = res.data;
        }.bind(this));
    };
  });
