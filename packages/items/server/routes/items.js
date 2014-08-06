'use strict';

var items = require('../controllers/items');
//var acl = require('acl');

module.exports = function(Customers, app, auth) {

  app.route('/items')
    .get(auth.requiresLogin, items.query)
    .post(auth.requiresLogin, items.create);
  app.route('/items/:itemId')
    .get(auth.requiresLogin, items.show)
    .put(auth.requiresLogin, items.update)
    .delete(auth.requiresLogin, items.destroy);

  app.route('/itemterms')
    .get(auth.requiresLogin, items.terms);

  app.route('/rrtemplates')
    .get(auth.requiresLogin, items.revRecTemplates);

  // Finish with setting up the itemId param
  app.param('itemId', items.item);
};
