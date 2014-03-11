require({

  // libraries dependencies with fallback
  paths: {

    ngProgress: [
      'vendor/ngProgress/1.0.3/ngProgress.min'
    ]

  },

  // define js scripts dependencies
  shim: {

    'ngProgress': {
      deps: ['angular']
    }

  },

  priority: [
    'ngProgress'
  ]

});