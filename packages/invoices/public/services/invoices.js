'use strict';

angular.module('mean.invoices') .factory('Invoices', ['$resource',
  function($resource) {
    return $resource('invoices/:invoiceId', {
      invoiceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      calculateTotals: {
        method:'POST',
        url: 'actions/invoices/calculatetotals'
      }
    });
  }
]).factory('InvoiceTerms', ['$resource',
  function($resource) {
    return $resource('invoiceterms');
  }
]);

// /actions/invoices/calculatetotals
