'use strict';

angular.module('mean.items').controller('ItemsController', ['$scope', '$location', '$filter', '$state', '$stateParams',
  'Global', 'ngTableParams', 'Items','RevRecSchedules','SETTINGS_EVENTS','SubscriptionTypes',
  function ($scope, $location, $filter, $state, $stateParams, Global, TableParams, Items, RevRecSchedules, SETTINGS_EVENTS,
            SubscriptionTypes) {
    $scope.global = Global;
    $scope.package = {
      name: 'items'
    };

    $scope.pageTitle = 'Create Item';
    $scope.subscriptionTypeOptionName = 'Select One';
    $scope.tableParams = new TableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      counts: 0,
      total: 0,
      getData: function($defer, params) {
        // use build-in angular filter
        Items.query(function(items) {
          // update table params

          params.total(items.length);
          var filteredData = params.filter() ? $filter('filter')(items,params.filter()) : items;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
      }
    });

    $scope.$on(SETTINGS_EVENTS.createSubscriptionType,function(){ $scope.getSubscriptionTypes(); });
    $scope.$on(SETTINGS_EVENTS.editSubscriptionType,function(){ $scope.getSubscriptionTypes(); });

    $scope.getRecurringPeriodTypes = function(){
      $scope.recurringPeriodTypes = [{type:'month', name:'Month(s)'},{type:'day', name:'Days(s)'}];
    };

    $scope.getSchedules = function() {
      RevRecSchedules.query(function(s){
        $scope.revRecs = s;
      });
    };

    $scope.getSubscriptionTypes = function() {
      SubscriptionTypes.query(function(s){
        $scope.subscriptionTypes = s;
      });
    };

    $scope.save = function (itemData) {
      if (this.itemForm.$valid) {
        var c = new Items(itemData);
        if(angular.isDefined($stateParams.itemId)) {
          c._id = $stateParams.itemId;
          c.$update(function(response){
            $state.go('items.list');
          });
        } else {
          c.$save(function (response) {
            $state.go('items.list');
          });
        }

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
      $state.go('items.list');
    };

    $scope.edit = function(item) {
      $state.go('items.edit', {itemId: item._id});
    };

    $scope.remove = function(item) {
      item.$delete(function(result) {
        $scope.tableParams.reload();
      });
    };

    $scope.initEdit = function() {
      this.getRecurringPeriodTypes();
      this.getSchedules();
      this.getSubscriptionTypes();
      if(angular.isDefined($stateParams.itemId)) {
        $scope.pageTitle = 'Edit Item';
        this.findById($stateParams.itemId);
      }
    };

    $scope.findById = function(cId) {
      Items.get({
        itemId: cId
      }, function(c) {
        $scope.item = c;
      });
    };

    $scope.find = function() {
      Items.query(function(items) {
        $scope.items = items;
      });
    };

    $scope.createNewType = function() {
      $state.go('.newtype');
    };

  }
]);
