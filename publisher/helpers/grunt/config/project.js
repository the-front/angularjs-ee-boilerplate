module.exports = {

  isoUtcDateTime: '<%= grunt.template.today("isoUtcDateTime") %>',

  paths: {
    gh_pages: '.local/gh_pages',
    project: {
      dev: '../src',
      prod: '../dist',
      tools: '../tools'
    }
  }

};
