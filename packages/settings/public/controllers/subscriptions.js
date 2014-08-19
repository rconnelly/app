'use strict';

angular.module('mean.settings').controller('SubscriptionSettingsController', ['$scope', '$state', 'Global', 'Settings','ngTableParams',
  function($scope, $state, Global, Settings, TableParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'subscription settings'
    };

    $scope.isActive = function(link){
      return link === $state.current.name;
    };

    $scope.scheduleListData = new TableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      counts: 0,
      total: 0,
      getData: function($defer, params) {
       /* Subscriptions.query(function(subscriptions) {
          // update table params
          $scope.schedules = subscriptions;

          params.total(subscriptions.length);
          var filteredData = params.filter() ? $filter('filter')(subscriptions,params.filter()) : subscriptions;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
        */
        var orderedData = [];
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  }
]);
