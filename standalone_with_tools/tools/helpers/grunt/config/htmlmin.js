module.exports = {

  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: '<%= project.paths.dist %>/',
      src: 'index.html',
      dest: '<%= project.paths.dist %>/',
    }],
  }

};
