module.exports = function(grunt) {

grunt.config('githubPages', {

  devCode: {

    options: {
      // The default commit message for the gh-pages branch
      commitMessage: 'dev code : gh-pages automated commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your gh-pages repo is
    src: '<%= project.gitclone.directory %>'
  },

  prodCode: {

    options: {
      // The default commit message for the gh-pages branch
      commitMessage: 'prod code : gh-pages automated commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your gh-pages repo is
    src: '<%= project.gitclone.directory %>'
  }

});

};
