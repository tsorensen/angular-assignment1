angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular.module('RepsAppControllers', [
  'repsService'
])
  .controller('MainCtrl', function(reps) {
    var self = this;
    self.reps = [];
    self.congressType = 'reps';
    self.loading = false;
    self.searchedOnce = false;

    self.apis = [{
      label: 'Zip',
      method: function(zip) {
        self.loading = true;
        self.searchedOnce = true;
        reps('all', 'zip', zip).then(function(data) {
          self.loading = false;
          self.reps = data;
        });
      }
    },
    {
      label: 'Last Name',
      method: function(name) {
        self.loading = true;
        self.searchedOnce = true;
        reps(self.congressType, 'name', name).then(function(data) {
          self.loading = false;
          self.reps = data;
        });
      }
    },
    {
      label: 'State',
      method: function(state) {
        self.loading = true;
        self.searchedOnce = true;
        reps(self.congressType, 'state', state).then(function(data) {
          self.loading = false;
          self.reps = data;
        });
      }
    }];
    self.criteria = self.apis[0];

  });

angular.module('repsService', [])
  .factory('reps', function($http){
    var host = 'http://dgm-representatives.herokuapp.com';

    /*
     * @function search
     * @param {String} type - can be "all", "reps", "sens"
     * @param {String} query - can be any string
     */
    function search(type, criteria, query) {
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function(res){
          return res.data;
        });
    }

    search.allByZip = search.bind(null, 'all', 'zip');
    search.repsByName = search.bind(null, 'reps', 'name');
    search.repsByState = search.bind(null, 'reps', 'state');
    search.sensByName = search.bind(null, 'sens', 'name');
    search.sensByState = search.bind(null, 'sens', 'state');

    return search;
  });
