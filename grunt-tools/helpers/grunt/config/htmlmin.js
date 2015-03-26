module.exports = function(grunt) {

grunt.config('htmlmin', {

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

});

};
