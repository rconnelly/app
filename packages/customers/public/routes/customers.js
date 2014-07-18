'use strict';

angular.module('mean.customers').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('list customers', {
            url: '/customers',
            templateUrl: 'customers/views/list.html'
        });

      $stateProvider.state('create customers', {
        url: '/customers/create',
        templateUrl: 'customers/views/create.html'
      });

    }
]);
