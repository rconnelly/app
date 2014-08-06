'use strict';

var subscriptions = require('../controllers/subscriptions');

// The Package is past automatically as first parameter
module.exports = function(Subscriptions, app, auth, database) {
  app.route('/subscriptions')
    .post(subscriptions.query)
    .post(subscriptions.create);

  app.route('/billingSchedules')
    .get(subscriptions.billingSchedules);
};
