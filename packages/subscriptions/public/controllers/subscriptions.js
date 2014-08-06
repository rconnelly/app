'use strict';

angular.module('mean.subscriptions').controller('SubscriptionsController', ['$scope', '$window', '$location', '$filter', '$stateParams',
  'Global', 'Subscriptions', 'Customers','Items', 'BillingSchedules','ngTableParams',
    function($scope, $window, $location, $filter, $stateParams, Global, Subscriptions, Customers, Items, BillingSchedules,TableParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'subscriptions'
        };

      $scope.subscriptions = [];
      $scope.subscription = {items:[]};
      $scope.items = [];
      $scope.format = 'shortDate';
      $scope.itemEditId = -1;

      $scope.init = function(){
        this.getItems();
        this.initBillingSchedules();
        this.pageTitle = (!$stateParams.subscriptionId) ? 'Create Subscription' : 'Edit Subscription';
        this.minDate = new Date();
      };

      $scope.find = function() {
        Subscriptions.query(function(subscriptions) {
          $scope.subscriptions = subscriptions;
        });
      };

      $scope.save = function(subscription){
      };

      $scope.initBillingSchedules = function() {
        BillingSchedules.query(function(results){
          $scope.billingSchedules = results;
        });
      };

      $scope.cancel = function(){
        $window.history.back();
      };

      $scope.getItems = function() {
        Items.query(function(s){
          $scope.items = s;
        });
      };

      $scope.removeItem = function(item) {
        var idx = this.subscription.items.indexOf(item);
        this.subscription.items.splice(idx,1);
        this.tableParams.reload();
      };

      $scope.editItem = function(item) {
        item.$edit = true;
      };

      $scope.doneEdit = function(item) {
        item.$edit = false;
      };

      $scope.saveEdit = function(item) {
        //$scope.itemEditId = item._id;
        item.$edit = false;
      };

      $scope.addItem = function(item) {
        if(!item || this.subscription.items.indexOf(item) !== -1)
          return;

        item.qty = 1;
        this.subscription.items.push(item);
        this.tableParams.reload();
      };

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
          var orderedData = $scope.subscription.items;
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });

      $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
      };

      $scope.findCustomers = function(value){
        return Customers.query({companyName: value}).$promise.then(function(results) {
          var customers = [];
          angular.forEach(results, function (customer) {
            customers.push(customer);
          });
          return customers;
        });
      };
    }
]);
