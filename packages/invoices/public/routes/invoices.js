'use strict';

angular.module('mean.invoices').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('list invoices', {
            url: '/invoices/list',
            templateUrl: 'invoices/views/index.html'
        });
    }
]);
