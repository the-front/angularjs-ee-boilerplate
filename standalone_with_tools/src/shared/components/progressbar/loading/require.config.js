require({

  // define js scripts dependencies
  shim: {

    'shared/components/progressbar/loading/module': {
      deps: ['angular', 'ngProgress']
    },

    'shared/components/progressbar/loading/factory.progress.config': {
      deps: ['shared/components/progressbar/loading/module']
    },

    'shared/components/progressbar/loading/factory.progress.status': {
      deps: ['shared/components/progressbar/loading/module']
    },

    'shared/components/progressbar/loading/config.interceptor': {
      deps: ['shared/components/progressbar/loading/factory.progress.status']
    }

  }

},

['require'], function(require) {

  console.log('shared/components/progressbar/loading require.js config');

  // start
  require([
    'shared/components/progressbar/loading/factory.progress.config',
    'shared/components/progressbar/loading/config.interceptor'
  ]);

});