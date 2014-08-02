'use strict';

angular.module('mean.invoices').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('list invoices', {
            url: '/invoices',
            templateUrl: 'invoices/views/index.html'
        });
    }
]);
