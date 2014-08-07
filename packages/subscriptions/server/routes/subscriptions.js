'use strict';

var subscriptions = require('../controllers/subscriptions');

// The Package is past automatically as first parameter
module.exports = function(Subscriptions, app, auth, database) {
  app.route('/subscriptions')
    .get(auth.requiresLogin, subscriptions.query)
    .post(auth.requiresLogin, subscriptions.create);

  app.route('/actions/subscriptions/calculatetotals')
    .post(auth.requiresLogin, subscriptions.calculateTotals);

  app.route('/subscriptions/:subscriptionId')
    .get(auth.requiresLogin, subscriptions.show)
    .delete(auth.requiresLogin, subscriptions.destroy)
    .put(auth.requiresLogin, subscriptions.update);

  app.route('/billingSchedules')
    .get(auth.requiresLogin, subscriptions.billingSchedules);

  // Finish with setting up the subscriptionId param
  app.param('subscriptionId', subscriptions.subscription);
};
