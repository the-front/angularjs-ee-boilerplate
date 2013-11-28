module.exports = {
  
  grunt: [
    'Gruntfile.js'
  ],

  helpers: [
    'helpers/grunt/**/*.js'
  ],

  app: [
    '<%= app.path %>/shared/**/*.js',
    '<%= app.path %>/app/**/*.js'
  ]

}; 