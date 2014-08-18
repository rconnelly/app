'use strict';

var subscriptions = require('../controllers/subscriptions');

// The Package is past automatically as first parameter
module.exports = function(Subscriptions, app, auth, database) {

  // Rest
  app.route('/subscriptions')
    .get(auth.requiresLogin, subscriptions.query)
    .post(auth.requiresLogin, subscriptions.create);

  app.route('/subscriptions/:subscriptionId')
    .get(auth.requiresLogin, subscriptions.show)
    .delete(auth.requiresLogin, subscriptions.destroy)
    .put(auth.requiresLogin, subscriptions.update);

  // Automatically load the subscription into the request
  // when :subscriptionId match is found
  app.param('subscriptionId', subscriptions.subscription);

  app.route('/billingSchedules')
    .get(auth.requiresLogin, subscriptions.billingSchedules);

  // Actions
  app.route('/actions/subscriptions/calculatetotals')
    .post(auth.requiresLogin, subscriptions.calculateTotals);

  // Requires
  app.route('/actions/subscriptions/enddate')
    .get(auth.requiresLogin, subscriptions.getEndDate);

};
