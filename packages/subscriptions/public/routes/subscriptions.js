'use strict';

angular.module('mean.subscriptions').config(['$stateProvider',
  function($stateProvider) {

    $stateProvider
      .state('subscriptions', {
        url: '/subscriptions/list',
        templateUrl: 'subscriptions/views/list.html'
      })
      .state('subscriptions create', {
        url: '/subscriptions/create',
        templateUrl: 'subscriptions/views/edit.html'
      })
      .state('subscription edit', {
        url: '/subscriptions/:subscriptionId',
        templateUrl: 'subscriptions/views/edit.html'
      });
  }
]);
