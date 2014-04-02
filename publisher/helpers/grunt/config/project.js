module.exports = {

  isoUtcDateTime: '<%= grunt.template.today("isoUtcDateTime") %>',

  paths: {
    gh_pages: '.local/gh_pages',
    project: {
      dev: '../standalone_with_tools/src',
      prod: '../standalone_with_tools/dist',
      tools: '../standalone_with_tools/tools'
    }
  }

};
