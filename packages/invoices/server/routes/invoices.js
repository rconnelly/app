'use strict';

var invoices = require('../controllers/invoices');

// The Package is past automatically as first parameter
module.exports = function(Subscriptions, app, auth, database) {
  app.route('/invoices')
    .get(auth.requiresLogin, invoices.query)
    .post(auth.requiresLogin, invoices.create);

  app.route('/actions/invoices/calculatetotals')
    .post(auth.requiresLogin, invoices.calculateTotals);

  app.route('/invoices/:subscriptionId')
    .get(auth.requiresLogin, invoices.show)
    .delete(auth.requiresLogin, invoices.destroy)
    .put(auth.requiresLogin, invoices.update);

  // Finish with setting up the subscriptionId param
  app.param('invoiceId', invoices.invoice);
};
