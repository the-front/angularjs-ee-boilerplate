module.exports = function(grunt) {
  'use strict';

  grunt.log.writeln('\nloading grunt plugins and configs...');
  require('load-grunt-config')(grunt, {configPath: __dirname+'/helpers/grunt/config'});
  grunt.log.writeln('...done\n');

  // load custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloworld
  //grunt.task.run('helloworld');


  //--- grunt tasks

  // TODO: define cleanup

  grunt.registerTask('default', ['jshint']); 

  grunt.registerTask('build', function(target) {
    if(target === 'dev') {
      return grunt.task.run([
        'default', 
        'less:dev'
      ]);

    } else if(target === 'prod') {
      return  grunt.task.run([
        'default'//, TODO: define tasks
      ]);

    }
  });

  grunt.registerTask('dev', function(target) {
    if(target === 'proxy') {
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

  /*
  grunt.registerTask('dist', function(target) {
    if(target === 'proxy') {
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
  */

};