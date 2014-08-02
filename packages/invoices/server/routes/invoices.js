'use strict';

// The Package is past automatically as first parameter
module.exports = function(Invoices, app, auth, database) {

    app.get('/invoices/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/invoices/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/invoices/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/invoices/example/render', function(req, res, next) {
        Invoices.render('index', {
            package: 'invoices'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
