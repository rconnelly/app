'use strict';

//Items service used for items REST endpoint
angular.module('mean.items')
  .factory('Items', ['$resource',
    function($resource) {
      return $resource('items/:itemId', {
        itemId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ])
  .factory('ItemTerms', ['$resource',
    function($resource) {
      return $resource('itemterms');
    }
  ])
  .factory('RevRecSchedules', ['$resource',
    function($resource) {
      return $resource('rrtemplates');
    }
  ]);
