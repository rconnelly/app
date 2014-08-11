'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Invoices = new Module('invoices');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Invoices.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Invoices.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Invoices.menus.add({
        title: 'Invoices',
        link: 'invoice',
        roles: ['authenticated'],
        menu: 'main',
        priority: 20
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Invoices.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Invoices.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Invoices.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Invoices;
});
