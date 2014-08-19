'use strict';

angular.module('mean.subscriptions').controller('SubscriptionsController', ['$scope', '$window', '$location', '$filter', '$state', '$stateParams', '$q','lodash',
  'Global', 'Subscriptions', 'Customers','Items', 'BillingSchedules','SubscriptionTypes','ngTableParams',
    function($scope, $window, $location, $filter, $state, $stateParams, $q, _, Global, Subscriptions, Customers, Items, BillingSchedules,SubscriptionTypes,TableParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'subscriptions'
        };

      $scope.itemOptionName = 'Items';
      $scope.subscriptions = [];
      $scope.subscription = {items:[]};
      $scope.items = [];
      $scope.format = 'shortDate';
      $scope.itemEditId = -1;
      $scope.total = 0;
      $scope.pageTitle = (!$stateParams.subscriptionId) ? 'Create Subscription' : 'Edit Subscription';
      $scope.editMode = !!$stateParams.subscriptionId;

      $scope.initList = function(){

      };

      $scope.init = function(){
        this.getSubscriptionTypes();
        this.initSubscription($stateParams.subscriptionId);
        this.initBillingSchedules();
        this.minDate = new Date();
      };

      $scope.initSubscription = function(subscriptionId){
        if(!$stateParams.subscriptionId)
          return;
        Subscriptions.get({subscriptionId:subscriptionId}, function(subscription){
          $scope.subscription = subscription;
          $scope.itemListData.reload();
        });
      };

      $scope.getSubscriptionTypes = function(cb) {
        var deferred = $q.defer();
        SubscriptionTypes.query(function(s){
          $scope.subscriptionTypes = s;
          deferred.resolve();
          if(!!cb)
            cb();
        });
        return deferred.promise;
      };

      $scope.$watch(
        'subscription.subscriptionType',
        function() {
          if(!!$scope.subscription.subscriptionType) {
            $scope.itemOptionName = 'Items (' + $scope.subscription.subscriptionType.name + ')';
            $scope.getItemsBySubscriptionType($scope.subscription.subscriptionType.name);
          }
        },
        true
      );

      $scope.getItemsBySubscriptionType = function(subscriptionType) {
        if(!subscriptionType)
          return;

        Items.query({subscriptionType: subscriptionType},function(s){
          $scope.items = s;
        });
      };

      $scope.save = function(subscription){
        if (this.subscriptionForm.$valid) {
          var s = new Subscriptions(subscription);

          if(angular.isDefined($stateParams.subscriptionId)) {
            s._id = $stateParams.subscriptionId;
            s.$update(function(response){
              $state.go('subscriptions.list');
            });
          } else {
            s.$save(function (response) {
              $state.go('subscriptions.list');
            });
          }

        } else {
          $scope.submitted = true;
        }
      };

      $scope.initBillingSchedules = function() {
        BillingSchedules.query(function(results){
          $scope.billingSchedules = results;
        });
      };

      $scope.cancel = function(){
        $window.history.back();
      };

      /** Items
       * */

      $scope.removeItem = function(item) {
        var idx = this.subscription.items.indexOf(item);
        this.subscription.items.splice(idx,1);
        this.itemListData.reload();
      };

      $scope.editItem = function(item) {
        item.$edit = true;
      };

      $scope.doneEdit = function(item) {
        item.$edit = false;
      };

      $scope.saveEdit = function(item) {
        item.$edit = false;
      };

      $scope.addItem = function(item) {
        if(!item)
          return;

        var existingItem = _.find(this.subscription.items,function(itm){
          return (itm._id === item._id);
        },this);

        if(!!existingItem) {
          existingItem.qty++;
        } else {
          item.qty = 1;
          this.subscription.items.push(item);
        }

        $scope.updateTotals($scope.subscription,function(){
          if(!existingItem)
            $scope.itemListData.reload();
        });

      };

      // Watch subscription items for changes
      $scope.$watch(
        'subscription.items',
        function() {
          $scope.updateTotals($scope.subscription);
        },
        true
      );

      $scope.updateTotals = function(subscription,cb) {
        Subscriptions.calculateTotals(subscription, function(result){
          // copy over total and extended only
          $scope.subscription.total = result.total;
          for(var i = 0; i < $scope.subscription.items.length; i++){
            if(angular.isDefined(result.items[i]))
              $scope.subscription.items[i].extended = result.items[i].extended;
          }
          if(!!cb)
            cb();
        });
      };

      $scope.editSubscription = function(subscription) {
        $state.go('subscriptions.edit', {subscriptionId: subscription._id});
      };

      $scope.removeSubscription = function(subscription){
        subscription.$remove(function(result){
          $scope.subscriptionListData.reload();
        });
      };

      $scope.itemListData = new TableParams({
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

      $scope.subscriptionListData = new TableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
          name: 'asc'     // initial sorting
        }
      }, {
        counts: 0,
        total: 0,
        getData: function($defer, params) {
          Subscriptions.query(function(subscriptions) {
            // update table params
            $scope.subscriptions = subscriptions;

            params.total(subscriptions.length);
            var filteredData = params.filter() ? $filter('filter')(subscriptions,params.filter()) : subscriptions;

            var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          });
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
