'use strict';

angular.module('mean.payments').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('payments', {
            url: '/payments',
            templateUrl: 'payments/views/index.html'
        });
    }
]);
