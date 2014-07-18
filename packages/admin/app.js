'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Admin = new Module('admin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Admin.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Admin.routes(app, auth, database);

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Admin.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Admin.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Admin.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Admin;
});
