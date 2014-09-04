'use strict';


var subscriptionTypes = require('../controllers/subscriptionTypes');

// The Package is past automatically as first parameter
module.exports = function(Settings, app, auth, database) {

  app.route('/settings/subscriptions/types')
    .get(auth.requiresLogin, subscriptionTypes.query)
    .post(auth.requiresLogin, subscriptionTypes.create);

  app.route('/settings/subscriptions/types/:typeId')
    .delete(auth.requiresLogin, subscriptionTypes.destroy);

  app.get('/settings/subscriptions/scheduletypes', subscriptionTypes.scheduleTypes);
  app.get('/settings/subscriptions/daysOfMonth', subscriptionTypes.daysOfMonth);
  app.get('/settings/subscriptions/daysOfWeek', subscriptionTypes.daysOfWeek);
  app.get('/settings/subscriptions/months', subscriptionTypes.months);

  // Finish with setting up the subscriptionId param
  app.param('typeId', subscriptionTypes.subscriptionType);
};
