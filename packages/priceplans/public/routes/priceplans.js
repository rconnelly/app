'use strict';

angular.module('mean.priceplans').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('create price plans', {
            url: '/priceplans/create',
            templateUrl: 'priceplans/views/create.html'
        });

      $stateProvider.state('list price plans', {
        url: '/priceplans',
        templateUrl: 'priceplans/views/list.html'
      });
    }
]);
