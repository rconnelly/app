'use strict';

angular.module('mean.subscriptions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('list subscriptions', {
            url: '/subscriptions',
            templateUrl: 'subscriptions/views/list.html'
        });
    }
]);
