module.exports = function(grunt) {
  'use strict';

  var _         = require('lodash-node');
  var _s        = require( 'underscore.string' );
  var path      = require( 'path' );
  var engine    = require( '../../lib/generate/engine' );
  var questions = require( '../../lib/generate/questions' );

  grunt.registerTask(
    'generate',
    'generate files based on templates',
  function(template, value, outputDir) {

    var options = this.options({}),
        tplsDir = options.templatesDir || 'templates',
        defaultOutputDir = options.outputDir || 'dist',
        restContext = options.restContext || 'rest';

    //---

    // Async Task
    var done = this.async();

    questions({
      source: tplsDir,
      destination: defaultOutputDir,
      restContext: restContext
    })
    .then(function( optionsToEngine ) {

      // TODO: define and return some string message on engine when finished?
      return engine( optionsToEngine );

    })
    .then(function() {
      return done( true );
    })
    .catch(function(e) {
      grunt.fail.fatal(e.stack);
      return done(e);
    });

  });

};
