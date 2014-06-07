module.exports = function(grunt) {

grunt.config('githubPages', {

  devCode: {

    options: {
      // The default commit message for the branch
      commitMessage: 'dev code : <%= project.gitclone.branch %> automated commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your repo is
    src: '<%= project.gitclone.directory %>'
  },

  prodCode: {

    options: {
      // The default commit message for the branch
      commitMessage: 'prod code : <%= project.gitclone.branch %> automated commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your repo is
    src: '<%= project.gitclone.directory %>'
  }

});

};
