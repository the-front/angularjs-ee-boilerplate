module.exports = {
  
  options: {
    reporter: require('jshint-stylish')
  },

  grunt: [
    'Gruntfile.js'
  ],

  helpers: [
    'helpers/grunt/**/*.js'
  ],

  app: [
    '!<%= app.src %>/vendor/**/*.js',
    '<%= app.src %>/{,shared/,app/}*.js'
  ]

}; 