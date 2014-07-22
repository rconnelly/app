'use strict';

angular.module('mean.customers').controller('CustomersController', ['$scope', '$location', 'Global', 'Customers',
  function ($scope, $location, Global, Customers) {
    $scope.global = Global;
    $scope.package = {
      name: 'customers'
    };

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
