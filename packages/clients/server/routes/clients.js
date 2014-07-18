'use strict';

// The Package is past automatically as first parameter
module.exports = function(Clients, app, auth, database) {

    app.get('/clients/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/clients/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/clients/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/clients/example/render', function(req, res, next) {
        Clients.render('index', {
            package: 'clients'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
