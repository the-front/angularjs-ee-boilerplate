module.exports = function(grunt) {

grunt.config('watch', {

  reload: {
    files : [
      '<%= project.paths.build %>/**/*.{html,css,js}'
    ],
    options: {
      livereload: '<%= project.frontend.port.livereload %>'
    }
  },

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

};
