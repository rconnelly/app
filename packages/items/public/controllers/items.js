'use strict';

angular.module('mean.items').controller('ItemsController', ['$scope', 'Global', 'Items',
    function($scope, Global, Items) {
        $scope.global = Global;
        $scope.package = {
            name: 'items'
        };
    }
]);
