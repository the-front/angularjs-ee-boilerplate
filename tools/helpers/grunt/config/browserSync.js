// https://github.com/shakyShane/browser-sync/wiki/options

module.exports = {

  dev: {

    bsFiles: {
      src: [
        '<%= project.paths.src %>/styles/*.css',
        '<%= project.paths.src %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      server: {
        baseDir: '<%= project.paths.src %>',
        directory: true
      },

      watchTask: true
    }

  },

  devProxy: {

    bsFiles: {
      src: [
        '<%= project.paths.src %>/styles/*.css',
        '<%= project.paths.src %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      server: {
        baseDir: '<%= project.paths.src %>',
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

      server: {
        baseDir: '<%= project.paths.dist %>',
        directory: true
      }

    }

  },

  distProxy: {

    options: {

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
