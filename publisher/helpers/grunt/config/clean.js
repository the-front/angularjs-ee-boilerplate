module.exports = function(grunt) {

grunt.config('clean', {

  gh_pages_dir: [
    '<%= project.gitclone.directory %>/'
  ],

  gh_pages_content: [
    '<%= project.gitclone.directory %>/**/*'
  ]

});

grunt.loadNpmTasks('grunt-contrib-clean');

};
