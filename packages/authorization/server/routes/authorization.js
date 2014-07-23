'use strict';

// The Package is past automatically as first parameter
module.exports = function(Authorization, app, auth, database) {

    app.get('/authorization/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/authorization/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/authorization/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/authorization/example/render', function(req, res, next) {
        Authorization.render('index', {
            package: 'authorization'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
