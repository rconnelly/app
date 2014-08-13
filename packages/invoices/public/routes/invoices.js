'use strict';

angular.module('mean.invoices').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('invoice', {
        url: '/invoices',
        templateUrl: 'invoices/views/list.html'
      })
      .state('invoice create', {
        url: '/invoices/create',
        templateUrl: 'invoices/views/edit.html'
      })
      .state('invoice edit', {
        url: '/invoices/:invoiceId/edit',
        templateUrl: 'invoices/views/edit.html'
      })
      .state('invoice view', {
        url: '/invoices/:invoiceId/view',
        templateUrl: 'invoices/views/view.html'
      });
  }
]);
