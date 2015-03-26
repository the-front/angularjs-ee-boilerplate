module.exports = function(grunt) {

grunt.config('jshint', {

  options: {
    reporter: require('jshint-stylish')
  },

  grunt: [
    'config.js',
    'Gruntfile.js'
  ],

  helpers: [
    'helpers/grunt/**/*.js'
  ],

  project: [
    '<%= project.paths.src %>/{,shared/**/,app/**/}*.js',
    '!<%= project.paths.src %>/vendor/**/*.js',
    '!<%= project.paths.src %>/{,shared/**/,app/**/}*.min.js'
  ]

});

};
