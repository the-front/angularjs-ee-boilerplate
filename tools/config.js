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
    dist: 'dist'
  };

  //---

  config.glob = {
    paths: config.paths.src + '/{components,services}/**'
  };

  //---

  config.js = {

    project: {
      base: [ // TODO: review
        config.paths.src + '/core/**/*.js',
        '!' + config.paths.src + '/core/**/*.spec.js'
      ],
      files: [
        config.paths.src + '/**/*.js',
        '!' + config.paths.src + '/vendor/**/*.js'
      ]
    },

    tools: [
      'gulpfile.js',
      'tools/**/*.js'
    ]

  };

  //---

  var stylesVariables = config.paths.src + '/core/style/variables.scss';
  var stylesLayout = config.paths.src + '/core/style/layout.scss';

  // TODO: review
  config.styles = {

    project: {

      variables: stylesVariables,

      base: {
        theme: [
          stylesVariables,
          config.paths.src + '/core/style/mixins.scss'
        ],
        files: [
          config.paths.src + '/core/style/color-palette.scss',
          stylesVariables,
          config.paths.src + '/core/style/mixins.scss',
          config.paths.src + '/core/style/structure.scss',
          stylesLayout
        ]
      },

      standalone: {
        files: [
          stylesLayout
        ]
      },

      components: [
        config.glob.paths + '/*.scss'
      ],

      all: config.paths.src + '/**/*.scss' // TODO: needed?
    }

  };

  //---

  config.autoprefixer = {
    browsers: [
      'last 2 versions', 'last 4 Android versions'
    ]
  };

  //---

  // TODO: review
  config.__html = {
    main: config.paths.src + '/index.html',
    project: config.paths.src + '/**/*.html'
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
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular-animate.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular-route.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular-aria.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular-messages.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular.js/' + versions.angular + '/angular-mocks.js',

      'http://cdn.ciss.com.br/ajax/libs/angular_material/' + versions.angular_material + '/angular-material.min.js',

      'http://cdn.ciss.com.br/ajax/libs/hammerjs/' + versions.hammerjs + '/hammer.min.js',
      'http://cdn.ciss.com.br/ajax/libs/moment.js/' + versions.moment + '/moment-with-locales.min.js',
      'http://cdn.ciss.com.br/ajax/libs/angular-translate/' + versions.translate + '/angular-translate.min.js'
    ]
  };

  //---

  return config;

})();
