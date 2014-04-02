define(
// require.js dependency injection
[
  'angular',
  'shared/mock/module'
],

// require.js module scope
function(ng) {
  'use strict';

  return ng.mock.backend;

});
