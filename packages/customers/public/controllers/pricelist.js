'use strict';

angular.module('mean.customers').controller('PriceListController', ['$scope', '$location', '$filter', '$stateParams', '$window',
  'Global', 'ngTableParams', 'Customers','Items',
  function ($scope, $location, $filter, $stateParams, $window,
            Global, TableParams, Customers, Items) {
    $scope.global = Global;
    $scope.package = {
      name: 'pricelist'
    };

    $scope.customerId = $stateParams.customerId;

    $scope.selected = undefined;

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
        Customers.get({ customerId: $stateParams.customerId }, function(customer) {
          var priceList = customer.priceList;
          params.total(priceList.length);

          var filteredData = params.filter() ? $filter('filter')(priceList,params.filter()) : priceList;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
      }
    });

    $scope.cancel = function() {
      $window.history.back();
    };

    $scope.initEdit = function() {
      Customers.get({ customerId: $stateParams.customerId }, function(customer) {
        //$scope.customerItem = customer.priceList;
      });
    };

    $scope.initList = function() {
      Customers.get({ customerId: $stateParams.customerId }, function(customer) {
        $scope.customer = customer;
      });
    };
  }
]);
