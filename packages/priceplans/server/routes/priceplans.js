'use strict';

var priceplans = require('../controllers/priceplans');

// Article authorization helpers
/*var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};
*/


// The Package is past automatically as first parameter
module.exports = function(Priceplans, app, auth, database) {


  /*.get(priceplans.all)*/

  app.route('/priceplans')
    .post(auth.requiresLogin, priceplans.create);

 /* app.route('/articles/:articleId')
    .get(priceplans.show)
    .put(auth.requiresLogin, hasAuthorization, priceplans.update)
    .delete(auth.requiresLogin, hasAuthorization, priceplans.destroy);
*/
  // Finish with setting up the articleId param
  //app.param('priceplanId', priceplans.price);
};
