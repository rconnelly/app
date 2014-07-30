'use strict';

var items = require('../controllers/items');
//var acl = require('acl');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Customers, app, auth) {

  app.route('/items')
    .get(items.query)
    .post(auth.requiresLogin, items.create);
  app.route('/items/:itemId')
    .get(items.show)
    .put(auth.requiresLogin, hasAuthorization, items.update)
    .delete(auth.requiresLogin, hasAuthorization, items.destroy);

  // Finish with setting up the itemId param
  app.param('itemId', items.item);

};
