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
  ]

});

};
