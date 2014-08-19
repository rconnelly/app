'use strict';

angular.module('mean.invoices').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/invoices', '/invoices/list');
    $stateProvider
      .state('invoices', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('invoices.list', {
        url: '/invoices/list',
        templateUrl: 'invoices/views/list.html'
      })
      .state('invoices.create', {
        url: '/invoices/create',
        templateUrl: 'invoices/views/edit.html'
      })
      .state('invoices.edit', {
        url: '/invoices/:invoiceId/edit',
        templateUrl: 'invoices/views/edit.html'
      })
      .state('invoices.view', {
        url: '/invoices/:invoiceId/view',
        templateUrl: 'invoices/views/view.html'
      });
  }
]);
