module.exports = function(grunt) {

grunt.config('gitclone', {

  target: {
    options: '<%=  project.gitclone %>'
  }

});

grunt.loadNpmTasks('grunt-git');

};
