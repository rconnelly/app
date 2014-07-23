'use strict';

angular.module('mean.customers').controller('CustomersController', ['$scope', '$location', '$filter', '$stateParams', 'Global', 'ngTableParams', 'Customers',
  function ($scope, $location, $filter, $stateParams, Global, TableParams, Customers) {
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

    $scope.save = function (customerData) {
      if (this.customerCreateForm.$valid) {
        var c = new Customers(customerData);
        c.displayName = c.company.name;

        if(angular.isDefined($stateParams.customerId)) {
          c._id = $stateParams.customerId;
          c.$update(function(response){
            $location.path('customers');
          });
        } else {
          c.$save(function (response) {
            $location.path('customers');
          });
        }

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
      $location.path('customers');
    };

    $scope.edit = function(customer) {
      $location.path('customers/' + customer._id + '/edit');
    };

    $scope.manageSubscriptions = function(customer) {

    }

    $scope.managePriceLists = function(customer) {

    }

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

    $scope.initEdit = function() {
      if(angular.isDefined($stateParams.customerId)) {
        this.findById($stateParams.customerId);
      }
    };

    $scope.findById = function(cId) {
      Customers.get({
        customerId: cId
      }, function(c) {
        $scope.customer = c;
      });
    };

    $scope.find = function() {
      Customers.query(function(customers) {
        $scope.customers = customers;
      });
    };
  }
]);
