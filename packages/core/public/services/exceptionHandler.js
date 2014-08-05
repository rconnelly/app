'use strict';

angular.module('mean.core').factory('$exceptionHandler', ['$log',
  function($log) {
      var result = function(exception, cause) {
          $log.error('Message: ' + exception.message + '(cause: ' + cause + ')');
      };
    return result;
    }
]);
