define(function(require) {
  'use strict';

  var module = require('shared/mock/package');

  //-------------------
  // @begin: load mocks

  require('app/help/mock/allow-pass-github');

  require('app/bookmarks/mock/package');


  // TODO: add here mock module to load


  // @end: load mocks
  //-------------------
  // return mock module
  return module;

});
