'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Core = new Module('core');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Core.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Core.routes(app, auth, database);

    /*Core.aggregateAsset('css', 'http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,800,800italic', {weight: 12});
    Core.aggregateAsset('css', 'http://fonts.googleapis.com/css?family=Oswald:400,300,700', {weight: 11});
    Core.aggregateAsset('css', 'mvpready-admin-slate.css', {weight: 10});
     */

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Core.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Core.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Core.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Core;
});
