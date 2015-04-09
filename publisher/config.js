module.exports = (function() {
  var config = {};
  //---

  config.paths = {
    build: '../dist',
    repoDir: '.local'
  };

  config.git = {
    branch: 'gh-pages',
    commitMessage: '<%= branch %> automated commit <%= time %>'
  };

  config.js = [
    '**/*.js',
    '!node_modules/**/*'
  ];

  config.lintspaces = config.js.concat('package.json');

  //---
  return config;
})();
