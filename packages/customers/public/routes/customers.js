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

    $stateProvider
      .state('list customers', {
        url: '/customers',
        templateUrl: 'customers/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create customer', {
        url: '/customers/create',
        templateUrl: 'customers/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit customer', {
        url: '/customers/:customerId/edit',
        templateUrl: 'customers/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('list price list', {
        url: '/customers/:customerId/priceitems',
        templateUrl: 'customers/views/priceitem/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create customer item', {
        url: '/customers/:customerId/priceitems/create',
        templateUrl: 'customers/views/priceitem/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit customer item', {
        url: '/customers/:customerId/priceitems/:priceId/edit',
        templateUrl: 'customers/views/priceitem/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

  }
]);
