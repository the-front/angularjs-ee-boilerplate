module.exports = {

  gitignore: {
    files: [
      {
        cwd: './',
        src: ['.gitignore'],
        dest: '<%= app.paths.gh_pages %>/'
      }
    ]
  },

  project: {
    files: [
      {
        cwd: '<%= app.paths.project %>/',
        src: ['**'],
        dest: '<%= app.paths.gh_pages %>/',
        expand: true
      }
    ]
  }

};