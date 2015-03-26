module.exports = function() {
  'use strict';

  //----------------------------------------------------------------------------

  var karma = require('./config.karma');

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
