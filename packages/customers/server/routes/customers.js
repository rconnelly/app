'use strict';

// The Package is past automatically as first parameter
module.exports = function(Customers, app, auth, database) {

    app.get('/customers/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/customers/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/customers/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/customers/example/render', function(req, res, next) {
        Customers.render('index', {
            package: 'customers'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
