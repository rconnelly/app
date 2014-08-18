'use strict';

angular.module('mean.payments').controller('PaymentsController', ['$scope', 'Global', 'Payments',
    function($scope, Global, Payments) {
        $scope.global = Global;
        $scope.package = {
            name: 'payments'
        };
    }
]);
