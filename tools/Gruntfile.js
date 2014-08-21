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

  grunt.registerTask('dev', function(target) {
    if(target === 'sync') {

      return grunt.task.run([
        'build:dev',
        'browserSync:dev',
        'watch'
      ]);

    } else if(target === 'syncProxy') {

      grunt.loadNpmTasks('grunt-connect-proxy');

      return grunt.task.run([
        'build:dev',
        'configureProxies',
        'browserSync:devProxy',
        'watch'
      ]);

    } else if(target === 'proxy') {

      grunt.loadNpmTasks('grunt-connect-proxy');

      return grunt.task.run([
        'build:dev',
        'configureProxies',
        'connect:devProxy',
        'watch'
      ]);

    }

    return grunt.task.run([
      'build:dev',
      'connect:dev',
      'watch'
    ]);
  });


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

  //---


  //--- @begin: spec's tasks

  grunt.registerTask('specs:run:unit', ['karma:unit:start', 'watch:unit']);
  grunt.registerTask('specs:run:coverage', ['connect:coverage', 'watch:coverage']);

  grunt.registerTask('specs', ['start', 'karma:coverage', 'concurrent:specs']);

  //--- @end: spec's tasks

};
