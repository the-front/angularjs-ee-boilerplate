require({

  // define js scripts dependencies
  shim: {

    'shared/components/input/utils/module': {
      deps: ['angular']
    },

    'shared/components/input/utils/directive.input.blur': {
      deps: ['shared/components/input/utils/module']
    },

    'shared/components/input/utils/directive.input.focus': {
      deps: ['shared/components/input/utils/module']
    },

    'shared/components/input/utils/factory.input.focus': {
      deps: ['shared/components/input/utils/module']
    }

  }

},

['require'], function(require) {

  console.log('shared/components/input/utils require.js config');

  // start
  require([
    'shared/components/input/utils/directive.input.blur',
    'shared/components/input/utils/directive.input.focus',
    'shared/components/input/utils/factory.input.focus'
  ]);

});