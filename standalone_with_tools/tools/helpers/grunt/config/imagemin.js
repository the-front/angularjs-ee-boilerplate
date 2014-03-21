module.exports = {

  dist: {
    options: {
      optimizationLevel: 3
    },
    files: [
      {
        expand: true,
        cwd: '<%= project.paths.dist %>/',
        src: ['**/*.{png,jpg,jpeg,gif}'],
        dest: '<%= project.paths.dist %>/',
      }
    ]
  }

};
