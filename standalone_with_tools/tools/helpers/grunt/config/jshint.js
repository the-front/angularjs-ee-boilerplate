module.exports = {
  
  grunt: [
    'Gruntfile.js'
  ],

  helpers: [
    'helpers/grunt/**/*.js'
  ],

  app: [
    '<%= app.src %>/shared/**/*.js',
    '<%= app.src %>/app/**/*.js'
  ]

}; 