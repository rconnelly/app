'use strict';

angular.module('mean.subscriptions').controller('SubscriptionsController', ['$scope', 'Global', 'Subscriptions',
    function($scope, Global, Subscriptions) {
        $scope.global = Global;
        $scope.package = {
            name: 'subscriptions'
        };
    }
]);
