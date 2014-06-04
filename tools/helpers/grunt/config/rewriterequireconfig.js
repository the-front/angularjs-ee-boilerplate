module.exports = function(grunt) {

grunt.config('rewriterequireconfig', {

  tocompile: {

    input: '<%= project.require.config %>',

    output: '<%= project.require.build %>'

  }

});

};
