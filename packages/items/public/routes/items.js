'use strict';

angular.module('mean.items').config(['$stateProvider',


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

    $stateProvider
      .state('items', {
        url: '/items/list',
        templateUrl: 'items/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create item', {
        url: '/items/create',
        templateUrl: 'items/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit item', {
        url: '/items/:itemId/edit',
        templateUrl: 'items/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

  }
]);
