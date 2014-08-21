module.exports = function(grunt) {

grunt.config('open', {

  coverage: {
    path: '<%= project.paths.reports %>/coverage/html/index.html'
  }

});

};
