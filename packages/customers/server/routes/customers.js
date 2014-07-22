'use strict';

var customers = require('../controllers/customers');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Customers, app, auth) {

  app.route('/customers')
    .get(customers.all)
    .post(auth.requiresLogin, customers.create);
  app.route('/customers/:customersId')
    .get(customers.show)
    .put(auth.requiresLogin, hasAuthorization, customers.update)
    .delete(auth.requiresLogin, hasAuthorization, customers.destroy);

  // Finish with setting up the customerId param
  app.param('customerId', customers.customer);
};
