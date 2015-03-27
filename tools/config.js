module.exports = (function() {

  var path = require('path');
  var pkg = require('../package');

  //---

  var config = {};

  //--

  config.root = './';

  //--

  config.packages = [
    './package.json'
  ];

  //---

  config.banner =
    '/*!\n' +
    ' * ' + pkg.title + '\n' +
    ' * ' + pkg.description + '\n' +
    ' * @license ' + pkg.license + '\n' +
    ' * v' + pkg.version + '\n' +
    ' */\n';

  //---

  config.paths = {
    src: 'src',
    build: '.temp',
    dist: 'dist'
  };

  //---

  config.js = {

    project: [
      config.paths.src + '/**/*.js',
      '!' + config.paths.src + '/vendor/**/*.js'
    ],

    tools: [
      'gulpfile.js',
      'tools/**/*.js'
    ]

  };

  //---

  var stylefilename = 'app';

  config.styles = {
    sass: {
      main    : config.paths.src + '/scss/' + stylefilename + '.scss',
      project : config.paths.src + '/{app,scss,shared}/**/*.sass'
    },
    less: {
      main    : config.paths.src + '/less/' + stylefilename + '.less',
      project : config.paths.src + '/{app,less,shared}/**/*.less'
    }
  };

  //---

  config.autoprefixer = {
    browsers: [
      'last 2 versions', 'last 4 Android versions'
    ]
  };

  //---

  config.webserver = {
    port: 1337
  };

  //---

  var versions = {
    angular           : '1.3.9',
    angular_material  : '0.7.1',
    hammerjs          : '2.0.4',
    odin_icons        : '0.1.0',
    moment            : '2.9.0',
    translate         : '2.0.1'
  };

  config.versions = versions;

  config.karma = {
    dependencies: [
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular-animate.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular-route.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular-aria.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular-messages.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular.js/' + versions.angular + '/angular-mocks.js',

      'http://erkobridee.github.io/cdn/ajax/libs/angular_material/' + versions.angular_material + '/angular-material.min.js',

      'http://erkobridee.github.io/cdn/ajax/libs/hammerjs/' + versions.hammerjs + '/hammer.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/moment.js/' + versions.moment + '/moment-with-locales.min.js',
      'http://erkobridee.github.io/cdn/ajax/libs/angular-translate/' + versions.translate + '/angular-translate.min.js'
    ]
  };

  //---

  return config;

})();
