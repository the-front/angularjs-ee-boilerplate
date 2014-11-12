define(function(require) {
  'use strict';

  var module = require('./module');
  require('./factories/progress.config');
  require('./factories/progress.status');
  require('./factories/progress.interceptor');
  require('./interceptors/http.config');

  return module;

});
