'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
var fiddle = require('../controllers/fiddle.js');
var hasAuthorization = function(req, res, next) {
    console.log(req.user);
    console.log(req.fiddle.user);
  if (!req.user.isAdmin || req.fiddle.user._id !== req.user._id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};
module.exports = function(Fiddle, app, auth) {
  app.route('/api/fiddle/data')
    .get(fiddle.all)
    .post(auth.requiresLogin, fiddle.create);

  app.route('/api/fiddle/data/:fiddleId')
    .get(auth.isMongoId, fiddle.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, fiddle.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, fiddle.destroy);
  
  app.param('fiddleId', fiddle.fiddle);
};
