'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Subscriptions = new Module('subscriptions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Subscriptions.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Subscriptions.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Subscriptions.menus.add({
        title: 'Subscriptions',
        link: 'subscriptions',
        roles: ['authenticated'],
        menu: 'main',
        priority: 30
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Subscriptions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Subscriptions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Subscriptions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Subscriptions;
});
