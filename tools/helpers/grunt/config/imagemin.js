module.exports = function(grunt) {

grunt.config('imagemin', {

  dist: {
    options: {
      optimizationLevel: 3
    },
    files: [
      {
        expand: true,
        cwd: '<%= project.paths.dist %>/',
        src: ['**/*.{png,jpg,jpeg}'], // ,gif (not work on Windows platform)
        dest: '<%= project.paths.dist %>/',
      }
    ]
  }

});

};
