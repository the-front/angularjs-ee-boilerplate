module.exports = {

  gitignore: {
    files: [
      {
        cwd: './',
        src: ['.gitignore'],
        dest: '<%= project.paths.gh_pages %>/'
      }
    ]
  },

  projectDev: {
    files: [
      {
        cwd: '<%= project.paths.project.dev %>/',
        src: ['**'],
        dest: '<%= project.paths.gh_pages %>/',
        expand: true
      }
    ]
  },

  projectProd: {
    files: [
      {
        cwd: '<%= project.paths.project.prod %>/',
        src: ['**'],
        dest: '<%= project.paths.gh_pages %>/',
        expand: true
      }
    ]
  }

};
