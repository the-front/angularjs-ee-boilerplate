define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/edit');
  require('./controllers/list');
  require('./controllers/new');
  require('./controllers/search');
  require('./resources/rest');
  require('./resources/search');
  require('./states');

  return module;

});
