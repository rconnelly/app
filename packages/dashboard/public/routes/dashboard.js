'use strict';

angular.module('mean.dashboard').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('dashboard', {
      url: '/',
      templateUrl: 'dashboard/views/index.html',
      roles: ['authenticated']
    });
  }
]);
