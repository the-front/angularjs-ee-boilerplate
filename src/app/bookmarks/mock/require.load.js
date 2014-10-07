define(function(require) {
  'use strict';

  // allow request pass through angular.js mock url interceptor
  // require('./allow-pass');

  /**/
  require('./data'); // local mock data
  require('./url-interceptors'); // intercepts and responds
  /**/

});
