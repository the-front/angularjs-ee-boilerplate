module.exports = function(grunt) {
  'use strict';

  require('load-grunt-config')(grunt, {configPath: 'helpers/grunt/config'});

  // custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloWorld


  //--- grunt tasks

  grunt.registerTask('default', ['jshint']); 

  grunt.registerTask('build_dev', ['jshint', 'less:dev']);

  grunt.registerTask('dev', ['build_dev', 'connect:dev', 'watch']);

  // TODO: define build_prod and prod tasks

};