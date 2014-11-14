define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ProgressConfig', ProgressConfig);

  //---

  ProgressConfig.$inject = ['$rootScope', 'ngProgress'];

  function ProgressConfig($rootScope, ngProgress) {

    var service = {
      eventListeners: eventListeners,
      color: color,
      height: height
    };

    return service;

    //---

    function eventListeners() {

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

    }

    function color(new_color) {
      ngProgress.color(new_color);
    }

    function height(new_height) {
      ngProgress.height(new_height);
    }

  }

});
