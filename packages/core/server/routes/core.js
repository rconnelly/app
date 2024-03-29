'use strict';

// The Package is past automatically as first parameter
module.exports = function(Core, app, auth, database) {

    app.get('/core/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/core/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/core/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/core/example/render', function(req, res, next) {
        Core.render('index', {
            package: 'core'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
