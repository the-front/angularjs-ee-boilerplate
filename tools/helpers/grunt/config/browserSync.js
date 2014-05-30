// https://github.com/shakyShane/browser-sync/wiki/options

module.exports = {

  dev: {

    bsFiles: {
      src: [
        '<%= project.paths.build %>/styles/*.css',
        '<%= project.paths.build %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      ports: '<%= project.frontend.port.browserSync %>',

      server: {
        baseDir: '<%= project.paths.build %>',
        directory: true
      },

      watchTask: true
    }

  },

  devProxy: {

    bsFiles: {
      src: [
        '<%= project.paths.build %>/styles/*.css',
        '<%= project.paths.build %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      ports: '<%= project.frontend.port.browserSync %>',

      server: {
        baseDir: '<%= project.paths.build %>',
        directory: true,
        middleware: [
          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]
      },

      watchTask: true
    }

  },

  //---

  dist: {

    options: {

      ports: '<%= project.frontend.port.browserSync %>',

      server: {
        baseDir: '<%= project.paths.dist %>',
        directory: true
      }

    }

  },

  distProxy: {

    options: {

      ports: '<%= project.frontend.port.browserSync %>',

      server: {
        baseDir: '<%= project.paths.dist %>',
        directory: true,
        middleware: [
          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]
      }

    }

  },


};
