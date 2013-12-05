module.exports = function(grunt) {
  'use strict';

  require('load-grunt-config')(grunt, {configPath: __dirname+'/helpers/grunt/config'});

  // custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloWorld

  //--- grunt tasks

  grunt.registerTask('default', ['jshint']); 

  grunt.registerTask('init', [
    'jshint',
    'clean:gh_pages_dir',
    'gitclone:gh_pages'
  ]);

  grunt.registerTask('publish', [
    'jshint',
    'clean:gh_pages_content',
    'copy:gitignore',
    'copy:project',
    'githubPages:gh_pages'
  ]);

};