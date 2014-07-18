'use strict';

angular.module('mean.admin').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'admin/views/index.html'
        });

      $stateProvider.state('priceplans', {
        url: '/admin/priceplans',
        templateUrl: 'admin/views/priceplans/list.html'
      });
    }
]);
