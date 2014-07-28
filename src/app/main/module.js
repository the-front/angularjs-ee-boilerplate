define(
// require.js dependency injection
[
  'angular',
  'angularRoute',

  'angularUiBootstrap',

  './templates/cache',

  'shared/fend/progressbar-loading/require.load',
  'shared/fend/navbar/require.load',

  'app/home/require.load',
  'app/about/require.load',

  'app/bookmarks/require.load',

  'app/help/require.load'
],

// require.js module scope
function(ng) {
  'use strict';

  // Module definition
  return ng.module(

    // module name
    'main',

    // module dependencies
    [
      'ngRoute',

      'ui.bootstrap',

      'templatesCache',

      'fend.progressbar.loading',
      'fend.navbar',

      'home',
      'about',

      'bookmarks',

      'help'
    ]
  );

});
