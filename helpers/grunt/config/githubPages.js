module.exports = {

  devCode: {

    options: {
      // The default commit message for the gh-pages branch
      commitMessage: 'dev code : gh-pages auto commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your gh-pages repo is
    src: '<%= project.paths.gh_pages %>'
  },

  prodCode: {

    options: {
      // The default commit message for the gh-pages branch
      commitMessage: 'prod code : gh-pages auto commit <%= project.isoUtcDateTime %> (UTC)'
    },

    // The folder where your gh-pages repo is
    src: '<%= project.paths.gh_pages %>'
  }

};
