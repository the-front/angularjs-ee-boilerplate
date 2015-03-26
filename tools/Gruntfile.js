module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt)({
    customTasksDir: 'helpers/grunt/tasks'
  });

  // Initialize config
  grunt.initConfig({
    pkg: require('./package.json')
  });

  // load tasks config per file
  grunt.loadTasks('helpers/grunt/config');


  //--- grunt tasks ---

  grunt.registerTask('checkfiles', ['lintspaces:all', 'newer:jshint']);

  grunt.registerTask('start', ['clean', 'checkfiles']);

  grunt.registerTask('default', ['start']); // TODO: check grunt-prompt


  //---


  //--- @begin: grunt --force

  grunt.registerTask('forceon', 'Forces the force flag on', function() {
      grunt.option('force', true);
  });

  grunt.registerTask('forceoff', 'Forces the force flag off', function() {
      grunt.option('force', false);
  });

  //--- @end: grunt --force


  //--- @begin: build tasks

  grunt.registerTask('build:dev', [
    'start',
    'copy:dev_tobuild',
    'copy:dev_jstobuild',
    'copy:dev_vendortobuild',
    'cleanempty:build',
    'less:dev'
  ]);

  grunt.registerTask('build:prod', [
    'start',
    'karma:ci',
    'copy:prod_jstobuild',
    'html2js:prod',
    'rewriteRequireConfig',
    'requirejs',
    'clean:build',
    'copy:prod_todist',
    'cleanempty:dist',
    'less:prod',
    'htmlmin',
    'imagemin',
    'uglify',
    'concat:requireConfigDist',
    'clean:distUnusedFiles'
  ]);

  //--- @end: build tasks


  //--- @begin: spec's tasks

  // generate report's files for CI server
  grunt.registerTask('ci', [
    'start',
    'karma:ci'
  ]);

  // generate html report's files
  grunt.registerTask('reports', [
    'start',
    'forceon',
    'karma:reports',  // generate reports
    'forceoff',
    'copy:karma_report_jasmine',
    'clean:karma_report_jasmine',
    'open:reports'    // open reports ouput directory
  ]);

    //---

  // test's unit : karma runner
  grunt.registerTask('specs', [
    'checkfiles',
    'forceon',
    'karma:reports',  // generate reports
    'forceoff',
    'copy:karma_report_jasmine',
    'concurrent:specs'
  ]);

  // test's e2e : protractor
  grunt.registerTask('e2e', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'build:prod',
      'configureProxies',
      'connect:e2e',
      'protractor:e2e'
    ]);
  });

  //--- @end: spec's tasks


  //---


  // @begin: dev tasks
    // @begin: dev with livereload
  grunt.registerTask('server:livereload', ['connect:livereload', 'watch:livereload']);
  grunt.registerTask('server:livereload:proxy', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'configureProxies',
      'connect:livereloadProxy',
      'watch:livereload'
    ]);
  });

  grunt.registerTask('dev:livereload', ['build:dev','concurrent:livereload']);
  grunt.registerTask('dev:livereload:proxy', ['build:dev', 'concurrent:livereloadProxy']);
    // @end: dev with livereload

    // @begin: dev with browser sync
  grunt.registerTask('dev:sync', ['build:dev', 'browserSync:dev', 'watch:project']);
  grunt.registerTask('dev:sync:proxy', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'build:dev',
      'configureProxies',
      'browserSync:devProxy',
      'watch:project'
    ]);
  });
    // @end: dev with browser sync

    // @begin: dev alias
  grunt.registerTask('dev', ['dev:livereload']);
  grunt.registerTask('dev:proxy', ['dev:livereload:proxy']);
    // @end: dev alias
  // @end: dev tasks


  //---


  // @begin: distribution preview tasks
  grunt.registerTask('dist', ['build:prod', 'connect:dist']);
  grunt.registerTask('dist:proxy', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'build:prod',
      'configureProxies',
      'connect:distProxy'
    ]);
  });

    // @begin: preview with browser sync support
  grunt.registerTask('dist:sync', ['build:prod', 'browserSync:dist']);
  grunt.registerTask('dist:sync:proxy', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'build:prod',
      'configureProxies',
      'browserSync:distProxy'
    ]);
  });
    // @end: preview with browser sync support

  // @end: distribution preview tasks

};
