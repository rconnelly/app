'use strict';

angular.module('mean.dashboard').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    var checkLoggedIn = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user === '0') {
          $timeout(deferred.reject);
          $location.url('/auth/login');
        }

        // Not Authenticated
        else $timeout(deferred.resolve);
      });

      return deferred.promise;
    };

    $stateProvider.state('dashboard', {
      url: '/',
      templateUrl: 'dashboard/views/index.html',
      roles: ['authenticated'],
      resolve: {
        loggedin: checkLoggedIn
      }
    });
  }
]);
