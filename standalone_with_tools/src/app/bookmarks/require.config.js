require({

  // define js scripts dependencies
  shim: {

    //--- 

    'app/bookmarks/module': {
      deps: [
        'angular_route', 
        'angular_resource',
        'shared/components/input/utils/module',
        'shared/components/pagination/module'
      ]
    },

    //--- @begin resources

    'app/bookmarks/resources/rest': {
      deps: ['app/bookmarks/module']
    },

    'app/bookmarks/resources/search': {
      deps: ['app/bookmarks/module']
    },

    //--- @end resources


    //--- @begin controllers

    'app/bookmarks/controllers/edit': {
      deps: ['app/bookmarks/resources/rest']
    },

    'app/bookmarks/controllers/list': {
      deps: ['app/bookmarks/resources/rest']
    },

    'app/bookmarks/controllers/new': {
      deps: ['app/bookmarks/resources/rest']
    },

    'app/bookmarks/controllers/search': {
      deps: ['app/bookmarks/resources/search']
    },

    //--- @end controllers

    'app/bookmarks/routes': {
      deps: [ 
        'app/bookmarks/controllers/edit',
        'app/bookmarks/controllers/list',
        'app/bookmarks/controllers/new',
        'app/bookmarks/controllers/search'
      ]
    }

  }

},

['require'], function(require) {

  console.log('app/bookmarks require.js config');

  // start
  require([
    'app/bookmarks/routes' 
  ]);

});