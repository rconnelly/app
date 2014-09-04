'use strict';

angular.module('mean.settings').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/settings', '/settings/subscriptions');
    $stateProvider.state('settings', {
      url: '/settings',
      templateUrl: 'settings/views/index.html',
      abstract: true
    })
      .state('settings.subscriptions', {
        url: '/subscriptions',
        templateUrl: 'settings/views/subscriptions.html'
      })
      .state('settings.subscriptions.create', {
        url: '/types/create',
        onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal) {
          $modal.open({
            templateUrl: 'settings/views/subscriptionTypesModal.html',
            controller: 'SubscriptionTypesModalController'
          }).result.finally(function() {
              return $state.transitionTo('settings.subscriptions');
            });
        }]
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
