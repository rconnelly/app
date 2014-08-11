'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Invoice = mongoose.model('Invoice'),
  Item = mongoose.model('Item'),
  _ = require('lodash');


/**
 * Find invoice by id
 */
exports.invoice = function(req, res, next, id) {
  Invoice.load(id, function(err, invoice) {
    if (err) return next(err);
    if (!invoice) return next(new Error('Failed to load invoice ' + id));
    req.invoice = invoice;
    next();
  });
};

/** Calculate the items in the invoice and return a total. */
exports.calculateTotals = function(req,res)
{
  req.checkBody('invoice.customer', 'Customer must be a string').isAlphanumeric();
  //req.checkBody('invoice.items', 'Invoices items are required to calculate total').isLength(1);
  var invoice = req.body;
  Item.calculateTotals(invoice);
  res.json(invoice);
};

/** Calculate the items in the invoice and return a total. */
exports.defaultDueDate = function(req,res)
{
  //req.checkBody('invoice.customer', 'Customer must be a string').isAlphanumeric();
  //req.checkBody('invoice.items', 'Invoices items are required to calculate total').isLength(1);
  /*var data = req.body;
  Item.calculateTotals(invoice);*/
  res.json({});
};

/**
 * Create an invoice
 */
exports.create = function(req, res) {
  // TODO: Add validation

  var data = req.body;
  if(!!data.customer._id) // convert object to ref
    data.customer = data.customer._id;

  var invoice = new Invoice(data);
  invoice.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(invoice);
  });
};

/**
 * Update an invoice
 */
exports.update = function(req, res) {
  // TODO: Add validation

  var invoice = req.invoice;
  invoice = _.extend(invoice, req.body);
  invoice.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(invoice);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var invoice = req.invoice;

  invoice.remove(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(invoice);
  });
};

/**
 * Show an invoice
 */
exports.show = function(req, res) {
  res.json(req.invoice);
};

exports.billingSchedules = function(req, res) {
  Invoice.billingSchedules(function(terms) {
    res.json(terms);
  });
};

/**
 * List of invoices
 */
exports.query = function(req, res) {
  var query = {};
  if (!!req.query.name) {
    query = { name: new RegExp(req.query.name, 'i') };
  }
  Invoice.find(query).populate({path: 'customer'}).sort('-createdAt').exec(function (err, invoices) {
    if (err) {
      return res.json(500, err);
    }
    res.json(invoices);

  });
};
