'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Fiddle = new Module('fiddle');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Fiddle.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Fiddle.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Fiddle.menus.add({
    title: 'Fiddle',
    link: 'fiddle',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Fiddle.aggregateAsset('css', 'fiddle.css');
  Fiddle.aggregateAsset('js', '../lib/ace-builds/src-min-noconflict/ace.js');
  Fiddle.aggregateAsset('js', '../lib/angular-ui-ace/ui-ace.js');

  Fiddle.angularDependencies(['ui.ace']);
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Fiddle.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Fiddle.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Fiddle.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Fiddle;
});
