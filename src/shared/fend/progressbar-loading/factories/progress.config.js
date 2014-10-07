define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory(

    // resource name
    'ProgressConfig',

  // dependencies injection
  ['$rootScope', 'ngProgress',

  // factory definition
  function($rootScope, ngProgress) {

    return {
      eventListeners: function() {
        $rootScope.$on('loadingbar:start:event', function(event) {
          ngProgress.start();
        });

        $rootScope.$on('loadingbar:progress:event', function(event, value) {
          ngProgress.set(value);
        });

        $rootScope.$on('loadingbar:complete:event', function(event) {
          ngProgress.complete();
          ngProgress.stop();
        });
      },

      color: function(new_color) {
        ngProgress.color(new_color);
      },

      height: function(new_height) {
        ngProgress.height(new_height);
      }
    };

  }]);

});
