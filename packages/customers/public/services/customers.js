'use strict';

//Customers service used for articles REST endpoint
angular.module('mean.customers').factory('Customers', ['$resource',
  function($resource) {
    return $resource('customers/:customerId', {
      customerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
