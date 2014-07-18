'use strict';

angular.module('mean.clients').config(['$stateProvider',
    function($stateProvider) {
      $stateProvider.state('view clients', {
        url: '/clients',
        templateUrl: 'customers/views/view.html'
      });
    }
]);
