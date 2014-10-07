define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularMocksBackend');

  // get mock module
  return angular.module('ngMockBackend');

});
