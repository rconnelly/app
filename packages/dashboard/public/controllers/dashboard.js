'use strict';

angular.module('mean.dashboard').controller('DashboardController', ['$rootScope', '$scope', 'Global', 'Dashboard',
    function($rootScope, $scope, Global, Dashboard) {
        $scope.global = Global;
        $scope.package = {
            name: 'dashboard'
        };

      $rootScope.bodyClass = '';
    }
]);
