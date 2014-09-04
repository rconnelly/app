'use strict';

angular.module('mean.settings').controller('SubscriptionSettingsController', ['$scope', '$state', '$filter', 'Global', 'SubscriptionTypes','ngTableParams',
  function($scope, $state, $filter, Global, SubscriptionTypes, TableParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'subscription settings'
    };

    $scope.isActive = function(link){
      return link === $state.current.name;
    };

    $scope.reloadSubscriptions = function(){
      $scope.tableParams.reload();
    };

    $scope.remove = function(subscriptionType) {
      subscriptionType.$remove(function(){
        $scope.tableParams.reload();
      });
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
        SubscriptionTypes.query(function(subscriptions) {
          // update table params
          $scope.schedules = subscriptions;

          params.total(subscriptions.length);
          var filteredData = params.filter() ? $filter('filter')(subscriptions,params.filter()) : subscriptions;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
      }
    });
  }
]);
