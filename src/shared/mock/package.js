define(function(require) {
  'use strict';

  var module = require('./module');
  require('./backend');
  require('./helpers');
  require('./datastore');
  require('./allow-pass-jsonp');

  return module;

});
