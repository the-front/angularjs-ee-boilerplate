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

    // TODO: review and update tasks workflow

  grunt.registerTask('start', ['clean', 'lintspaces:all', 'newer:jshint']);

  grunt.registerTask('default', ['start']); // TODO: check grunt-prompt

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
  grunt.registerTask('server:dev', ['connect:dev', 'watch:livereload']);
  grunt.registerTask('server:dev:proxy', function() {
    grunt.loadNpmTasks('grunt-connect-proxy');
    return grunt.task.run([
      'configureProxies',
      'connect:devProxy',
      'watch:livereload'
    ]);
  });

  grunt.registerTask('dev', ['build:dev','concurrent:dev']);
  grunt.registerTask('dev:proxy', ['build:dev', 'concurrent:devProxy']);

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
  // @end: dev tasks


  //---


  // @begin: distribution preview tasks
  grunt.registerTask('dist', function(target) {
    if(target === 'sync') {

      return grunt.task.run([
        'build:prod',
        'browserSync:dist'
      ]);

    } else if(target === 'syncProxy') {

      grunt.loadNpmTasks('grunt-connect-proxy');

      return grunt.task.run([
        'build:prod',
        'configureProxies',
        'browserSync:distProxy'
      ]);

    } else if(target === 'proxy') {

      grunt.loadNpmTasks('grunt-connect-proxy');

      return grunt.task.run([
        'build:prod',
        'configureProxies',
        'connect:distProxy'
      ]);

    }

    return grunt.task.run([
      'build:prod',
      'connect:dist'
    ]);
  });
  // @end: distribution preview tasks


  //---


  //--- @begin: spec's tasks

  //grunt.registerTask('specs:run:unit', ['karma:background:start', 'watch:unit']); // TODO: review :: needed?
  grunt.registerTask('specs:run:coverage', ['connect:coverage', 'watch:coverage']);

  grunt.registerTask('specs', ['start', 'karma:coverage', 'concurrent:specs']);

  //--- @end: spec's tasks

};
