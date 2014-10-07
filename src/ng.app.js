define(function(require) {
  'use strict';

  var angular = require('angular');

  angular.element(document).ready(function() {

    console.log('bootstrap angular application');

    // define run module to bootstrap application
    var module = angular.module(
      // module name
      'run',

      // module dependencies
      [
        // enable mock and intercep $HTTP requests
        require('./require.mock.load').name,

        require('app/main/require.load').name
      ]
    );

    // start angular app
    angular.bootstrap(document, [module.name]);

  });

});
