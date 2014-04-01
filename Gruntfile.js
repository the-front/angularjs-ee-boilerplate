module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.log.writeln('\nloading grunt plugins and configs...');
  require('load-grunt-config')(
    grunt, {
      configPath: path.join(process.cwd(), 'helpers/grunt/config')
    }
  );
  grunt.log.writeln('...done\n');

  // load custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloworld
  //grunt.task.run('helloworld');


  //--- grunt tasks

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('init', [
    'jshint',
    'clean:gh_pages_dir',
    'gitclone:gh_pages'
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
        'copy:projectDev',
        'githubPages:devCode'
      ]);
    } else { // prod
      message += 'prod code';
      tasks = tasks.concat([
        'shell:projectBuild',
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
