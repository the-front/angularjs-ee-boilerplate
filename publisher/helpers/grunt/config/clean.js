module.exports = function(grunt) {

grunt.config('clean', {

  branch_dir: [
    '<%= project.gitclone.directory %>/'
  ],

  branch_dir_content: [
    '<%= project.gitclone.directory %>/**/*'
  ]

});

};
