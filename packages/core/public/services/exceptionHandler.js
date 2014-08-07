'use strict';

angular.module('mean.core').factory('$exceptionHandler', ['$log',
  function($log) {
    var result = function(exception, cause) {
      var msg = exception.message;
      if(!!cause)
        msg += ' (cause: ' + cause + ')';
      $log.error(msg);
    };
    return result;
  }
]);
