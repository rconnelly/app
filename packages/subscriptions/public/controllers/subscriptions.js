'use strict';

angular.module('mean.subscriptions').controller('SubscriptionsController', ['$scope', '$window', '$location', '$filter', '$stateParams',
  'Global', 'Subscriptions', 'Customers','Items', 'BillingSchedules','ngTableParams',
    function($scope, $window, $location, $filter, $stateParams, Global, Subscriptions, Customers, Items, BillingSchedules,TableParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'subscriptions'
        };

      $scope.init = function(){
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

      $scope.findItems = function(value, term){
        console.log('value: ' + value + ' term: ' + term);
        return Items.query({name: value, term: term}).$promise.then(function(results) {
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
        counts: 0,
        total: 0,
        getData: function($defer, params) {
          var orderedData = [];
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
