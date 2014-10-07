define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory(

    // resource name
    'ProgressStatus',

  ['$rootScope',

  function($rootScope) {

    return {
      start: function() {
        $rootScope.$emit('loadingbar:start:event');
      },

      progress: function(value) {
        $rootScope.$emit('loadingbar:progress:event', value*100);
      },

      complete: function() {
        $rootScope.$emit('loadingbar:complete:event');
      }
    };

  }]);

});
