'use strict';

var items = require('../controllers/items');
//var acl = require('acl');

module.exports = function(Customers, app, auth) {

  app.route('/items')
    .get(items.query)
    .post(auth.requiresLogin, items.create);
  app.route('/items/:itemId')
    .get(items.show)
    .put(auth.requiresLogin, items.update)
    .delete(auth.requiresLogin, items.destroy);

  app.route('/itemterms')
    .get(items.terms);

  app.route('/rrtemplates')
    .get(items.revRecTemplates);

  // Finish with setting up the itemId param
  app.param('itemId', items.item);
};
