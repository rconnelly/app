'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  InvoiceTerms = mongoose.model('InvoiceTerms');

/**
 * Find invoice by id
 */
exports.invoiceTerms = function(req, res, next, id) {
  InvoiceTerms.load(id, function(err, invoice) {
    if (err) return next(err);
    if (!invoice) return next(new Error('Failed to load invoice ' + id));
    req.invoice = invoice;
    next();
  });
};

/**
 * List of invoices
 */
exports.query = function(req, res) {
  InvoiceTerms.find().sort('createdAt').exec(function (err, terms) {
    if (err) {
      return res.json(500, err);
    }
    res.json(terms);
  });
};