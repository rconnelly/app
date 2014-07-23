'use strict';

// The Package is past automatically as first parameter
module.exports = function(Subscriptions, app, auth, database) {

    app.get('/subscriptions/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/subscriptions/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/subscriptions/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/subscriptions/example/render', function(req, res, next) {
        Subscriptions.render('index', {
            package: 'subscriptions'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
