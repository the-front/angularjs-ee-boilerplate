module.exports = function(grunt) {

grunt.config('lintspaces', {

  options: {
    editorconfig: '<%= project.paths.editorconfig %>'
  },

  all: {
    src: [
      'helpers/**/*.js',
      '<%= project.paths.src %>/{,app/,shared/}**/*.{html,css,js,coffee,less}',
      '<%= project.paths.src %>/less/**/*.less',
      '!<%= project.paths.src %>/vendor/**/*'
    ]
  },

  js: {
    src: [
      '<%= project.paths.src %>/**/*.js',
      '!<%= project.paths.src %>/vendor/**/*'
    ]
  },

  less: {
    src: [
      '<%= project.paths.src %>/**/*.less',
      '!<%= project.paths.src %>/vendor/**/*'
    ]
  },

  html: {
    src: [
      '<%= project.paths.src %>/**/*.html',
      '!<%= project.paths.src %>/vendor/**/*'
    ]
  }

});

};
