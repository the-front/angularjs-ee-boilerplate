module.exports = {

  dist: {
    options: {
      optimizationLevel: 3
    },
    files: [
      {
        expand: true,
        cwd: '<%= project.paths.dist %>/',
        src: ['**/*.{png,jpg,jpeg}'], // ,gif (not work on Windows plataform)
        dest: '<%= project.paths.dist %>/',
      }
    ]
  }

};
