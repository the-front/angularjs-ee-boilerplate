module.exports = function(grunt) {

grunt.config('concat', {

  'requireConfigDist': {
    src: [
      '<%= project.paths.dist %>/ng.app.js',
      '<%= project.paths.dist %>/require.config.js'
    ],
    dest: '<%= project.paths.dist %>/require.config.js'
  }

});

};
