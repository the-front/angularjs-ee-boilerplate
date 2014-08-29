
TODO:

1 - update /src/require.unit.load.js

  define(
  // require.js dependency injection
  [

    ...

    // ↓↓↓ ADD ↓↓↓
    '<%= location %>/tests/unit/require.load'
  ],

  // require.js module scope
  function() {});


2 - update /src/require.mock.load.js

  define(
  // require.js dependency injection
  [
    'shared/mock/require.load',

    ...

    // ↓↓↓ ADD ↓↓↓
    '<%= location %>/mock/require.load'
  ],

  // require.js module scope
  function() {});


3 - update /src/app/main/module.js
    or in some specific application module

  define(
  // require.js dependency injection
  [
    'angular',
    'angularRoute',

    ...

    // ↓↓↓ ADD ↓↓↓
    '<%= location %>/require.load'
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

        ...

        // ↓↓↓ ADD ↓↓↓
        '<%= name %>'
      ]
    );

  });


4 - delete this file : README.txt


-------------------------------------------------------------------------------

Values to templates:

  name: <%= name %>

  name capitalized: <%= helpers.capitalize( name ) %>

  location: <%= location %>

  backend resource: <%= endpoint %>

  backend resource regexp escape: <%= helpers.stringRegExpEscape( endpoint ) %>

-------------------------------------------------------------------------------
