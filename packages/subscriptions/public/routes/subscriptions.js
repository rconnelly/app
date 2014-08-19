'use strict';

angular.module('mean.subscriptions').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/subscriptions', '/subscriptions/list');

    $stateProvider
      .state('subscriptions', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('subscriptions.list', {
        url: '/subscriptions/list',
        templateUrl: 'subscriptions/views/list.html'
      })
      .state('subscriptions.create', {
        url: '/subscriptions/create',
        templateUrl: 'subscriptions/views/edit.html'
      })
      .state('subscriptions.edit', {
        url: '/:subscriptionId',
        templateUrl: 'subscriptions/views/edit.html'
      });
  }
]);
