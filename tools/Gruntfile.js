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


  //--- grunt tasks


  grunt.registerTask('start', ['clean', 'lintspaces:all', 'newer:jshint']);

  grunt.registerTask('default', ['start']); // TODO: check grunt-prompt


  //---


  // @begin: build tasks
  grunt.registerTask('build', function(target) {
    if(target === 'dev') {
      return grunt.task.run([
        'start',
        'copy:dev_tobuild',
        'copy:dev_jstobuild',
        'copy:dev_vendortobuild',
        'cleanempty:build',
        'less:dev'
      ]);

    } else if(target === 'prod') {
      return  grunt.task.run([
        'start',
        'copy:prod_jstobuild',
        'html2js:prod',
        'rewriterequireconfig',
        'requirejs',
        'clean:build',
        'copy:prod_todist',
        'cleanempty:dist',
        'less:prod',
        'htmlmin',
        'imagemin',
        'uglify'
      ]);

    }
  });
  // @end: build tasks


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


  //---


  //--- @begin: spec's tasks

  //grunt.registerTask('specs:run:unit', ['karma:background:start', 'watch:unit']); // TODO: review :: needed?
  grunt.registerTask('specs:run:coverage', ['connect:coverage', 'watch:coverage']);

  grunt.registerTask('specs', ['lintspaces:all', 'newer:jshint', 'karma:coverage', 'concurrent:specs']);

  //--- @end: spec's tasks

};
