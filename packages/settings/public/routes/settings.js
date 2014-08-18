'use strict';

angular.module('mean.settings').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('settings', {
      url: '/settings',
      templateUrl: 'settings/views/index.html',
      abstract: true
    })
      .state('settings.subscriptions', {
        url: '/subscriptions',
        templateUrl: 'settings/views/subscriptions.html'
      })
      .state('settings.notifications', {
        url: '/notifications',
        templateUrl: 'settings/views/notifications.html'
      })
      .state('settings.payments', {
        url: '/payments',
        templateUrl: 'settings/views/payments.html'
      })
      .state('settings.reports', {
        url: '/reports',
        templateUrl: 'settings/views/reports.html'
      })
      .state('settings.integrations', {
        url: '/integrations',
        templateUrl: 'settings/views/integrations.html'
      });
  }
]);
