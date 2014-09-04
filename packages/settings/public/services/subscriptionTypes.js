'use strict';

angular.module('mean.settings') .factory('SubscriptionTypes', ['$resource',
  function($resource) {
    return $resource('settings/subscriptions/types/:typeId', {
      typeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getDaysOfMonth: {
        method:'GET',
        url: 'settings/subscriptions/daysofmonth',
        isArray: true
      },
      getDaysOfWeek: {
        method:'GET',
        url: 'settings/subscriptions/daysofweek',
        isArray: true
      },
      getScheduleTypes: {
        method:'GET',
        url: 'settings/subscriptions/scheduletypes',
        isArray: true
      },
      getMonths: {
        method:'GET',
        url: 'settings/subscriptions/months',
        isArray: true
      }
    });
  }
]);
