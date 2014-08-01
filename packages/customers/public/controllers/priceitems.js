'use strict';

angular.module('mean.customers').controller('PriceItemsController', ['$rootScope', '$scope', '$location', '$filter', '$stateParams', '$window',
  'Global', 'ngTableParams', 'Customers','Items','PriceItems',
  function ($rootScope, $scope, $location, $filter, $stateParams, $window,
            Global, TableParams, Customers, Items, PriceItems) {
    $scope.global = Global;
    $scope.package = {
      name: 'priceitems'
    };
    $scope.customerId = $stateParams.customerId;
    $scope.editMode = $stateParams.priceId;
    $scope.items = [];
    $scope.selected = undefined;

    $scope.save = function (item) {
      if (this.customerItemForm.$valid) {
        var priceItem = new PriceItems(item);
        if(!angular.isDefined(priceItem._id)) {
          priceItem.customerId = $stateParams.customerId;
          priceItem.$save(function () {
            $window.history.back();
          });
        }
      } else {
        $scope.submitted = true;
      }
    };

    $scope.findItems = function(value){
      return Items.query({name: value}).$promise.then(function(results) {
        var items = [];
        angular.forEach(results, function (item) {
          items.push(item);
        });
        return items;
      });
    };

    $scope.tableParams = new TableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      total: 0,
      getData: function($defer, params) {
        // use built-in angular filter
        PriceItems.query({ customerId: $stateParams.customerId }, function(priceItems) {
          params.total(priceItems.length);

          var filteredData = params.filter() ? $filter('filter')(priceItems,params.filter()) : priceItems;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
      }
    });

    $scope.cancel = function() {
      $window.history.back();
    };

    $scope.edit = function(priceItem) {
      $location.path('customers/' + $stateParams.customerId + '/priceitems/' + priceItem._id  + '/edit');
    };

    $scope.initEdit = function() {
      PriceItems.get({ customerId: $stateParams.customerId, priceId: $stateParams.priceId }, function(priceItem) {
        $scope.priceItem = priceItem;
      });
    };

    $scope.initList = function() {
      Customers.get({ customerId: $stateParams.customerId }, function(customer) {
        $scope.customer = customer;
      });
    };
  }
]);
