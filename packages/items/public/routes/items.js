'use strict';

angular.module('mean.items').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    var onModalEnter = ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
      $modal.open({
        templateUrl: 'settings/views/subscriptionTypesModal.html',
        controller: 'SubscriptionTypesModalController'
      }).result.finally(function() {
          return $state.transitionTo('^');
        });
    }];

    $urlRouterProvider.when('/items', '/items/list');
    $stateProvider
      .state('items', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('items.list', {
        url: '/items/list',
        templateUrl: 'items/views/list.html'
      })
      .state('items.create', {
        url: '/items/create',
        templateUrl: 'items/views/edit.html'
      })
      .state('items.create.newtype', {
        url: '/newtype',
        onEnter: onModalEnter
      })
      .state('items.edit', {
        url: '/items/:itemId/edit',
        templateUrl: 'items/views/edit.html'
      })
      .state('items.edit.newtype', {
        url: '/newtype',
        onEnter: onModalEnter
      });
  }
]);