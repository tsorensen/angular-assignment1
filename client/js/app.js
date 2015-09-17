angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular.module('RepsAppControllers', [
  'repsService'
])
  .controller('MainCtrl', function(reps) {
    this.reps = [];

    this.searchByZip = function(zip) {
      reps.allByZip(zip).then(function(data) {
        this.reps = data;
      }.bind(this));
    };

    this.searchRepsByName = function(name) {
      reps.repsByName(name).then(function(data) {
        this.reps = data;
      }.bind(this));
    };

    this.searchRepsByState = function(state) {
      reps.repsByState(state).then(function(data) {
        this.reps = data;
      }.bind(this));
    };

    this.searchSensByName = function(name) {
      reps.sensByName(name).then(function(data) {
        this.reps = data;
      }.bind(this));
    };

    this.searchSensByState = function(state) {
      reps.sensByState(state).then(function(data) {
        this.reps = data;
      }.bind(this));
    };
  });

angular.module('repsService', [])
  .factory('reps', function($http){
    var host = 'http://dgm-representatives.herokuapp.com';
    return {
      allByZip: function(zip) {
        return $http
          .get(host + '/all/by-zip/' + zip)
          .then(function(res) {
            return res.data;
          });
      },
      repsByName: function(name) {
        return $http
          .get(host + '/reps/by-name/' + name)
          .then(function(res){
            return res.data;
          });
      },
      repsByState: function(state) {
        return $http
          .get(host + '/reps/by-state/' + state)
          .then(function(res) {
            return res.data;
          });
      },
      sensByName: function(name) {
        return $http
          .get(host + '/sens/by-name/' + name)
          .then(function(res){
            return res.data;
          });
      },
      sensByState: function(state) {
        return $http
          .get(host + '/sens/by-state/' + state)
          .then(function(res) {
            return res.data;
          });
      }
    };
  });
