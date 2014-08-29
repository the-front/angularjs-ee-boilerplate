/*
  How do I fix the error EMFILE: Too many opened files?

    This is because of your system's max opened file limit.
    For OSX the default is very low (256).
    Temporarily increase your limit with `ulimit -n 10480`,
    the number being the new max limit.

    In some versions of OSX the above solution doesn't work.
    In that case try `launchctl limit maxfiles 10480 10480` and restart your terminal.

  https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files

  https://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6
*/

module.exports = function(grunt) {

// https://github.com/gruntjs/grunt-contrib-watch/issues/71#issuecomment-26152333

grunt.registerTask('watch:coverage', function() {

  grunt.config('watch', {

    coverage: {
      files : [
        '<%= project.paths.reports %>/coverage/html/index.html'
      ],
      options: {
        livereload: '<%= project.coverage.port.livereload %>'
      }
    }

  });
  return grunt.task.run('watch');

});

//---

grunt.registerTask('watch:reports', function() {

  grunt.config('watch', {

    reports: {
      files : [
        '<%= project.paths.reports %>/**/Phantom*/index.html'
      ],
      options: {
        livereload: '<%= project.reports.port.livereload %>'
      }
    }

  });
  return grunt.task.run('watch');

});

//---

grunt.registerTask('watch:livereload', function() {

  grunt.config('watch', {

    reload: {
      files : [
        '<%= project.paths.build %>/**/*.{html,css,js}'
      ],
      options: {
        livereload: '<%= project.frontend.port.livereload %>'
      }
    }

  });
  return grunt.task.run('watch');

});

//---

grunt.registerTask('watch:project', function() {

  grunt.config('watch', {

    js: {
      files: [
        '<%= project.paths.src %>/**/*.js'
      ],
      tasks : [
        'newer:lintspaces:js',
        'newer:jshint:project',
        'newer:copy:dev_jstobuild'
      ]
    },

    less: {
      files: [
        '<%= project.paths.src %>/**/*.less'
      ],
      tasks : [
        'newer:lintspaces:less',
        'less:dev'
      ]
    },

    otherfiles: { // html, images, ...
      files: [
        '<%= project.paths.src %>/**/*',
        '!<%= project.paths.src %>/**/*.{js,less}',
        '!<%= project.paths.src %>/vendor/**/*',
      ],
      tasks : [
        'newer:lintspaces:html',
        'newer:copy:dev_tobuild'
      ]
    },

    vendor: {
      files: [
        '<%= project.paths.src %>/vendor/**/*',
        '!<%= project.paths.src %>/vendor/**/*.less'
      ],
      tasks : [ 'newer:copy:dev_vendortobuild' ]
    }

  });
  return grunt.task.run('watch');

});

};
