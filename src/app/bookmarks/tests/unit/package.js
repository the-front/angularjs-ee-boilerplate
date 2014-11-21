define(function(require) {
  'use strict';

  require('./module.spec');
  require('./resources/rest.spec');
  require('./resources/search.spec');
  require('./controllers/list.spec');
  require('./controllers/search.spec');
  require('./controllers/new.spec');
  require('./controllers/edit.spec');

  // TODO: update test
  // require('./routes.spec');

});
