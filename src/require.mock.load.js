define(function(require) {
  'use strict';

  var module = require('shared/mock/require.load');

  //-------------------
  // @begin: load mocks

  require('app/help/mock/allow-pass-github');

  require('app/bookmarks/mock/require.load');


  // TODO: add here mock module to load


  // @end: load mocks
  //-------------------
  // return mock module
  return module;

});
