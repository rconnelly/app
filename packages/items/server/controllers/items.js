'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Item = mongoose.model('Item'),
  _ = require('lodash');


/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
  Item.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.item = item;
    next();
  });
};


/**
 * Create an article
 */
exports.create = function(req, res) {
  var item = new Item(req.body);

  item.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(item);

  });
};

/**
 * Update an item
 */
exports.update = function(req, res) {
  var item = req.item;

  item = _.extend(item, req.body);

  item.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(item);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var item = req.item;

  item.remove(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(item);

  });
};

/**
 * Show an item
 */
exports.show = function(req, res) {
  res.json(req.item);
};

exports.terms = function(req, res) {
  Item.terms(function(terms) {
    res.json(terms);
  });
};

exports.revRecTemplates = function(req, res) {
  Item.revRecTemplates(function(scheds) {
    res.json(scheds);
  });
};


/**
 * List of items
 */
exports.query = function(req, res) {
  Item.query(req.query).sort('-createdAt').exec(function (err, items) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the items'
      });
    }
    res.json(items);

  });
};
