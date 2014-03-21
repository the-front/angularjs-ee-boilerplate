module.exports = {
  gh_pages: {
    options: {
      repository: '<%= package.repository.url %>',
      branch: 'gh-pages',
      directory: '<%= project.paths.gh_pages %>'
    }
  }
};
