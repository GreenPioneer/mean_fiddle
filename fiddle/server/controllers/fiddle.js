'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Fiddle = mongoose.model('fiddle'),
  _ = require('lodash');


/**
 * Find fiddle by id
 */
exports.fiddle = function(req, res, next, id) {
  Fiddle.load(id, function(err, fiddle) {
    if (err) return next(err);
    if (!fiddle) return next(new Error('Failed to load fiddle ' + id));
    req.fiddle = fiddle;
    next();
  });
};

/**
 * Create an fiddle
 */
exports.create = function(req, res) {
  var fiddle = new Fiddle(req.body);
  fiddle.user = req.user;
  fiddle.save(function(err) {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Cannot save the FIDDLE'
      });
    }
    res.json(fiddle);

  });
};

/**
 * Update an fiddle
 */
exports.update = function(req, res) {
  var fiddle = req.fiddle;

  fiddle = _.extend(fiddle, req.body);

  fiddle.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the fiddle'
      });
    }
    res.json(fiddle);

  });
};

/**
 * Delete an fiddle
 */
exports.destroy = function(req, res) {
  var fiddle = req.fiddle;

  fiddle.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the fiddle'
      });
    }
    res.json(fiddle);

  });
};

/**
 * Show an fiddle
 */
exports.show = function(req, res) {
  res.json(req.fiddle);
};

/**
 * List of Fiddles
 */
exports.all = function(req, res) {
  Fiddle.find().sort('-created').populate('user', 'name username').exec(function(err, fiddles) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the fiddles'
      });
    }
    res.json(fiddles);

  });
};
