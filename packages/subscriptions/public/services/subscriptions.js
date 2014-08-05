'use strict';

//Items service used for items REST endpoint
angular.module('mean.items')
  .factory('Subscriptions', ['$resource',
    function($resource) {
      return $resource('subscriptions/:subscriptionId', {
        itemId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]).factory('BillingSchedules', ['$resource',
    function($resource) {
      return $resource('billingschedules');
    }
  ]);
