'use strict';

angular.module('mean.reports').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('reports', {
            url: '/reports',
            templateUrl: 'reports/views/index.html'
        });
    }
]);
