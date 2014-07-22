'use strict';

angular.module('mean.customers').config(['$stateProvider',


  function($stateProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider.state('list customers', {
      url: '/customers',
      templateUrl: 'customers/views/list.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });

    $stateProvider.state('create customers', {
      url: '/customers/create',
      templateUrl: 'customers/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });

  }
]);
