module.exports = function() {
  'use strict';

  //----------------------------------------------------------------------------

  var karma = {

    reportsDir: 'tests_out',

    options: {

      basePath: '../',

      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'requirejs'],

      // https://karma-runner.github.io/0.12/config/files.html

      // list of files / patterns to load in the browser
      files: [
        {pattern: 'src/vendor/**/*.{js,map,css}', included: false, served: true, watched:false},

        // load app source and test's specs
        'tools/tests/require.config.js',

        // app source, tests specs and html for cache templates
        {pattern: 'src/**/*.{js,css,html}', included: false, served: true}
      ],

      // list of files to exclude
      exclude: [
        'src/require.config.js',
        'src/require.mock.load.js',
        'src/**/mock/**/*'
      ],

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        'src/**/*.html': ['ng-html2js'],
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        '{src,src/!(vendor)/!(tests){,/!(tests){,/!(tests){,/!(tests)}}}}/!(require.load).js': ['coverage']
      },

      ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'src/'
      },

      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS', 'Chrome', 'Firefox'],

      logLevel: 'INFO',

      // web server port
      port: 9876

    }

  }; // @end: karma

  //----------------------------------------------------------------------------

  var paths = {

    editorconfig: '../.editorconfig',
    src: '../src',
    build: '.temp',
    dist: '../dist',                    // production files
    reports: '../' + karma.reportsDir,  // karma reports output
    templates: 'templates'

  }; // @end: paths

  //----------------------------------------------------------------------------

  var frontend = {

    webserver: 1337,
    livereload: 9337 // default: 35729

  }; // @end: frontend

  //----------------------------------------------------------------------------

  // config proxy to application backend
  var backend = {

    host: 'localhost',
    port: 9000,
    context: 'rest'

  }; // @end: backend

  //----------------------------------------------------------------------------

  return {
    karma:      karma,
    paths:      paths,
    frontend:   frontend,
    backend:    backend
  };

};
