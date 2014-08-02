'use strict';

angular.module('mean.invoices').controller('InvoicesController', ['$scope', 'Global', 'Invoices',
    function($scope, Global, Invoices) {
        $scope.global = Global;
        $scope.package = {
            name: 'invoices'
        };
    }
]);
