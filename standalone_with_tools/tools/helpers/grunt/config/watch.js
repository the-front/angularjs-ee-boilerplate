module.exports = {

  reload: {
    files : [
      '<%= app.src %>/**/*.{html,css,js}'
    ],
    options: {
      livereload: true
    }    
  },

  js: {
    files: [
      '<%= app.src %>/**/*.js'
    ],
    tasks : [ 'jshint:app' ]
  },

  less: {
    files: [
      '<%= app.src %>/**/*.less'
    ],
    tasks : [ 'less:dev' ]
  }

};