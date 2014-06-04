module.exports = function(grunt) {

grunt.config('jshint', {

  options: {
    reporter: require('jshint-stylish')
  },

  grunt: [
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

grunt.loadNpmTasks('grunt-contrib-jshint');

};
