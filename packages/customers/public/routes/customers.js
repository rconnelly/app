'use strict';

angular.module('mean.customers').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider, USER_ROLES) {

    $urlRouterProvider.when('/customers', '/customers/list');

    $stateProvider
      .state('customers', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: ['authenticated']
        }
      })
      .state('customers.list', {
        url: '/customers/list',
        templateUrl: 'customers/views/list.html'
      })
      .state('customers.create', {
        url: '/customers/create',
        templateUrl: 'customers/views/edit.html'
      })
      .state('customers.edit', {
        url: '/customers/:customerId/edit',
        templateUrl: 'customers/views/edit.html'
      });

      // TODO: Remove price list support
      /*
      .state('list price list', {
        url: '/customers/:customerId/priceitems',
        templateUrl: 'customers/views/priceitem/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create customer item', {
        url: '/customers/:customerId/priceitems/create',
        templateUrl: 'customers/views/priceitem/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit customer item', {
        url: '/customers/:customerId/priceitems/:priceId/edit',
        templateUrl: 'customers/views/priceitem/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      }); */

  }
]);
