'use strict';

var customers = require('../controllers/customers'),
  priceItems = require('../controllers/priceitems');
//var acl = require('acl');

module.exports = function(Customers, app, auth) {

  app.route('/customers')
    .get(auth.requiresLogin, customers.all)
    .post(auth.requiresLogin, customers.create);

  app.route('/customers/:customerId/priceitems')
    .get(auth.requiresLogin, priceItems.all)
    .post(auth.requiresLogin, priceItems.create);

  app.route('/customers/:customerId/priceitems/:priceId')
    .get(auth.requiresLogin, priceItems.show)
    .put(auth.requiresLogin, priceItems.update)
    .put(auth.requiresLogin, priceItems.destroy);

  app.route('/customers/:customerId')
    .get(auth.requiresLogin, customers.show)
    .put(auth.requiresLogin, customers.update)
    .delete(auth.requiresLogin, customers.destroy);

  // Finish with setting up the customerId param
  app.param('customerId', customers.customer);

};
