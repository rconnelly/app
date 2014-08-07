'use strict';

angular.module('mean.subscriptions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('list subscriptions', {
      url: '/subscriptions/list',
      templateUrl: 'subscriptions/views/list.html'
    })
      .state('create subscriptions', {
        url: '/subscriptions/create',
        templateUrl: 'subscriptions/views/create.html'
      })
      .state('edit subscription', {
        url: '/subscriptions/:subscriptionId',
        templateUrl: 'subscriptions/views/create.html'
      });
  }
]);
