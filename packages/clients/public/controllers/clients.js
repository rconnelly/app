'use strict';

angular.module('mean.clients').controller('ClientsController', ['$scope', 'Global', 'Clients',
    function($scope, Global, Clients) {
        $scope.global = Global;
        $scope.package = {
            name: 'clients'
        };
    }
]);
