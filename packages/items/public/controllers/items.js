'use strict';

angular.module('mean.items').controller('ItemsController', ['$scope', '$location', '$filter', '$stateParams', 'Global', 'ngTableParams', 'Items',
  function ($scope, $location, $filter, $stateParams, Global, TableParams, Items) {
    $scope.global = Global;
    $scope.package = {
      name: 'items'
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

    $scope.save = function (itemData) {
      if (this.itemCreateForm.$valid) {
        var c = new Items(itemData);
        c.displayName = c.company.name;

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
      if (item) {
        item.$remove();

        for (var i in $scope.items) {
          if ($scope.items[i] === item) {
            $scope.items.splice(i, 1);
          }
        }
      } else {
        $scope.items.$remove(function(response) {
          $location.path('items');
        });
      }
    };

    $scope.initEdit = function() {
      if(angular.isDefined($stateParams.itemId)) {
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
