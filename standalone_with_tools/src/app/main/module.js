define(
// require.js dependency injection
[
  'angular',
  'angularRoute',

  'shared/fend/progressbar-loading/require.load',

  'app/home/require.load',  
  'app/about/require.load',

  'app/bookmarks/require.load',

  'app/help/require.load',
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

      'fend.progressbar.loading',

      'home',
      'about',

      'bookmarks',

      'help'
    ]
  );

});