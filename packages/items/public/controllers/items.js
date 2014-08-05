'use strict';

angular.module('mean.items').controller('ItemsController', ['$scope', '$location', '$filter', '$stateParams', 'Global', 'ngTableParams', 'Items','ItemTerms',
  function ($scope, $location, $filter, $stateParams, Global, TableParams, Items, ItemTerms) {
    $scope.global = Global;
    $scope.package = {
      name: 'items'
    };

    $scope.pageTitle = 'Create Item';

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

    $scope.getItemTerms = function() {
      ItemTerms.query(function(itemTerms){
        $scope.itemTerms = itemTerms;
      });
    };

    $scope.save = function (itemData) {
      if (this.itemForm.$valid) {
        var c = new Items(itemData);

        if(angular.isDefined($stateParams.itemId)) {
          c._id = $stateParams.itemId;
          c.$update(function(response){
            $location.path('items');
          });
        } else {
          c.$save(function (response) {
            $location.path('items');
          });
        }

      } else {
        $scope.submitted = true;
      }
    };

    $scope.cancel = function() {
      $location.path('items');
    };

    $scope.edit = function(item) {
      $location.path('items/' + item._id + '/edit');
    };

    $scope.remove = function(item) {
      item.$remove();
      $scope.tableParams.reload();
    };

    $scope.initEdit = function() {
      this.getItemTerms();
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
  }
]);
