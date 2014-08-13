'use strict';

angular.module('mean.subscriptions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('subscriptions', {
      url: '/subscriptions/list',
      templateUrl: 'subscriptions/views/list.html'
    })
      .state('create subscriptions', {
        url: '/subscriptions/create',
        templateUrl: 'subscriptions/views/edit.html'
      })
      .state('edit subscription', {
        url: '/subscriptions/:subscriptionId',
        templateUrl: 'subscriptions/views/edit.html'
      });
  }
]);
