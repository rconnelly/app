'use strict';

//Customer Items service used for articles REST endpoint
angular.module('mean.customers').factory('PriceItems', ['$resource',
  function($resource) {
    return $resource('customers/:customerId/priceitems/:priceId', {
      customerItemId: '@_id',
      customerId: '@customerId'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
