define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ProgressStatus', ProgressStatus);

  //---

  ProgressStatus.$inject = ['$rootScope'];

  function ProgressStatus($rootScope) {

    var service = {
      start: start,
      progress: progress,
      complete: complete
    };

    return service;

    //---

    function start() {
      $rootScope.$emit('loadingbar:start:event');
    }

    function progress(value) {
      $rootScope.$emit('loadingbar:progress:event', value*100);
    }

    function complete() {
      $rootScope.$emit('loadingbar:complete:event');
    }

  }

});
