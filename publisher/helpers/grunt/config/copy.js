module.exports = {

  gitignore: {
    files: [
      {
        cwd: './',
        src: ['.gitignore'],
        dest: '<%= project.gitclone.directory %>/'
      }
    ]
  },

  projectDev: {
    files: [
      {
        cwd: '<%= project.paths.project.dev %>/',
        src: [
          '**',
          '!**/*.less'
        ],
        dest: '<%= project.gitclone.directory %>/',
        expand: true
      }
    ]
  },

  projectProd: {
    files: [
      {
        cwd: '<%= project.paths.project.prod %>/',
        src: ['**'],
        dest: '<%= project.gitclone.directory %>/',
        expand: true
      }
    ]
  }

};
