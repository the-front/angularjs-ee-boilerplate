module.exports = function(grunt) {

grunt.config('project', {

  isoUtcDateTime: '<%= grunt.template.today("isoUtcDateTime") %>',

  paths: {
    project: {
      tools: '../tools',
      dev: '<%= project.paths.project.tools %>/.temp',
      prod: '../dist'
    }
  },

  gitclone: {
    branch: 'gh-pages',
    directory: '.local/<%= project.gitclone.branch %>',
    repository: '<%= mainPkg.repository.url %>'
  }

});

};
