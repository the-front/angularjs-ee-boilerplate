module.exports = {
  gh_pages: {
    options: {
      repository: '<%= mainPkg.repository.url %>',
      branch: 'gh-pages',
      directory: '<%= project.paths.gh_pages %>'
    }
  }
};
