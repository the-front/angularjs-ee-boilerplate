require({

  // define js scripts dependencies
  shim: {

    'shared/components/pagination/module': {
      deps: ['angular']
    },

    'shared/components/pagination/filter.pages.range': {
      deps: ['shared/components/pagination/module']
    },

    'shared/components/pagination/factory': {
      deps: ['shared/components/pagination/module']
    }

  }

},

['require'], function(require) {

  console.debug('shared/components/pagination require.js config');

  // start
  require([
    'shared/components/pagination/filter.pages.range',
    'shared/components/pagination/factory'
  ]);

});