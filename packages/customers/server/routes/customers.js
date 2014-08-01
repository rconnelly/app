'use strict';

var customers = require('../controllers/customers'),
  priceItems = require('../controllers/priceitems');
//var acl = require('acl');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Customers, app, auth) {

  app.route('/customers')
    .get(auth.requiresLogin, customers.all)
    .post(auth.requiresLogin, customers.create);

  app.route('/customers/:customerId/priceitems')
    .get(auth.requiresLogin, priceItems.all)
    .post(auth.requiresLogin, priceItems.create);

  app.route('/customers/:customerId/priceitems/:priceId')
    .get(auth.requiresLogin, priceItems.show);

  app.route('/customers/:customerId')
    .get(auth.requiresLogin, customers.show)
    .put(auth.requiresLogin, hasAuthorization, customers.update)
    .delete(auth.requiresLogin, hasAuthorization, customers.destroy);

  // Finish with setting up the customerId param
  app.param('customerId', customers.customer);

};
