module.exports = {

  reload: {
    files : [
      '!<%= app.path %>/**/*.less',
      '<%= app.path %>/**/*.{html,css,js}'
    ],
    options: {
      livereload: true
    }    
  },

  js: {
    files: [
      '<%= app.path %>/**/*.js'
    ],
    tasks : [ 'jshint:app' ]
  },

  less: {
    files: [
      '<%= app.path %>/**/*.less'
    ],
    tasks : [ 'less:dev' ]
  }

};