module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);

  var path = require('path'),
      cwd =  process.cwd();

  // Initialize config
  grunt.initConfig({
    pkg: require('./package.json'),
    mainPkg: grunt.file.readJSON(path.join(cwd, '../package.json'))
  });

  // load tasks config per file
  grunt.loadTasks('helpers/grunt/config');

  // load custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloworld
  //grunt.task.run('helloworld');


  //--- grunt tasks

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('init', [
    'jshint',
    'clean:gh_pages_dir',
    'gitclone:target'
  ]);

  grunt.registerTask('publish',  function(target) { // default: prod workflow
    var message = 'publish ',
        tasks = [
          'jshint',
          'clean:gh_pages_content',
          'copy:gitignore'
        ];

    if(target === 'dev') {
      message += 'dev code';
      tasks = tasks.concat([
        'shell:projectBuildDev',
        'copy:projectDev',
        'shell:projectClean',
        'githubPages:devCode'
      ]);
    } else { // prod
      message += 'prod code';
      tasks = tasks.concat([
        'shell:projectBuildProd',
        'copy:projectProd',
        'shell:projectClean',
        'githubPages:prodCode'
      ]);
    }

    grunt.log.writeln(message);
    //console.log(tasks);
    return grunt.task.run(tasks);
  });

};
