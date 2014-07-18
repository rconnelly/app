'use strict';

//Price Plan service used for articles REST endpoint
angular.module('mean.priceplans').factory('PricePlans', ['$resource',
  function($resource) {
    return $resource('priceplans/:pricePlanId', {
      pricePlanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
