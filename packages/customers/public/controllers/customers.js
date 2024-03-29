'use strict';

angular.module('mean.customers').controller('CustomersController', ['$scope', '$location', '$filter', '$state', '$stateParams', 'Global', 'ngTableParams', 'Customers',
  function ($scope, $location, $filter, $state, $stateParams, Global, TableParams, Customers) {
    $scope.global = Global;
    $scope.package = {
      name: 'customers'
    };

    $scope.pageTitle = (!!$stateParams.customerId) ? 'Edit Customer' : 'Create Customer';

    $scope.tableParams = new TableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      total: 0,
      counts: 0,
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
            $state.go('customers.list');
          });
        } else {
          c.$save(function (response) {
            $state.go('customers.list');
          });
        }

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
      $state.go('customers.list');
    };

    $scope.edit = function(customer) {
      $state.go('customers.edit',{customerId: customer._id});
    };

    $scope.manageSubscriptions = function(customer) {
      $state.go('subscriptions.list');
    };

    $scope.remove = function(customer) {
      //customer.$remove();
      customer.$delete(function(){
        $scope.tableParams.reload();
      });
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
