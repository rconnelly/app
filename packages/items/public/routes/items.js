'use strict';

angular.module('mean.items').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

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
      .state('items.edit', {
        url: '/items/:itemId/edit',
        templateUrl: 'items/views/edit.html'
      });
  }
]);