'use strict';

angular.module('mean.subscriptions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('subscriptions example page', {
            url: '/subscriptions/example',
            templateUrl: 'subscriptions/views/index.html'
        });
    }
]);
