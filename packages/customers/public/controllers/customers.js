'use strict';

angular.module('mean.customers').controller('CustomersController', ['$scope', '$location', '$filter', 'Global', 'ngTableParams', 'Customers',
  function ($scope, $location, $filter, Global, TableParams, Customers) {
    $scope.global = Global;
    $scope.package = {
      name: 'customers'
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
        // use build-in angular filter
        Customers.query(function(customers) {
            // update table params

          params.total(customers.length);
            var filteredData = params.filter() ? $filter('filter')(customers,params.filter()) : customers;

            var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) : filteredData;


            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        });
      }
    });

    $scope.create = function (newCustomer) {
      if (this.customerCreateForm.$valid) {
        var customer = new Customers(newCustomer);
        customer.displayName = customer.company.name;
        customer.$save(function (response) {
          $location.path('customers');
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
      $location.path('customers');
    };

    $scope.remove = function(customer) {
      if (customer) {
        customer.$remove();

        for (var i in $scope.customers) {
          if ($scope.customers[i] === customer) {
            $scope.customers.splice(i, 1);
          }
        }
      } else {
        $scope.customers.$remove(function(response) {
          $location.path('customers');
        });
      }
    };

    $scope.find = function() {
      Customers.query(function(customers) {
        $scope.customers = customers;
      });
    };
  }
]);
