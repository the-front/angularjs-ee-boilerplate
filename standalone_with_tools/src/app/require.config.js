require({

  // define js scripts dependencies
  shim: {

    //--- 

    'app/main/module': {
      deps: [
        'angular_route', 
        'angular_resource',
        'toaster',
        'shared/components/progressbar/loading/module',
        'shared/components/input/utils/module',
        'shared/components/pagination/module'
      ]
    },

    //--- @begin app files

    'app/main/factory.menu.config': {
      deps: ['app/main/module']
    },

    'app/main/controller': {
      deps: ['app/main/factory.menu.config']
    },

    'app/home/controller': {
      deps: ['app/main/module']
    },

    'app/about/controller': {
      deps: ['app/main/module']
    },

    'app/help/controller': {
      deps: ['app/main/module']
    },

    //--- @end app files

    'app/main/routes': {
      deps: [ // TODO: review and add app controllers ref's
        'app/home/controller',
        'app/about/controller',
        'app/help/controller'
      ]
    },

    'app/main/start': {
      deps: [ // TODO: review and add app routes and view componentes ref's
        'app/main/controller',
        'app/main/routes'     
      ]
    }

  }

},

['require'], function(require) {

  console.log('app require.js config');

  require(['app/main/start']);

});