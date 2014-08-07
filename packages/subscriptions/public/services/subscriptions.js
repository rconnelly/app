'use strict';

//Items service used for items REST endpoint
angular.module('mean.subscriptions')
  .factory('Subscriptions', ['$resource',
    function($resource) {
      return $resource('subscriptions/:subscriptionId', {
        subscriptionId: '@_id'
      }, {
        update: {
          method: 'PUT'
        },
        calculateTotals: {
          method:'POST',
          url: 'actions/subscriptions/calculatetotals'
        }
      });
    }
  ]).factory('BillingSchedules', ['$resource',
    function($resource) {
      return $resource('billingschedules');
    }
  ]);
