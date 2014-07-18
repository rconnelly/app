'use strict';

// The Package is past automatically as first parameter
module.exports = function(Items, app, auth, database) {

    app.get('/items/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/items/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/items/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/items/example/render', function(req, res, next) {
        Items.render('index', {
            package: 'items'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
