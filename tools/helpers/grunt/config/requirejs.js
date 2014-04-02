module.exports = {

  /*
    http://tech.pro/blog/1639/using-rjs-to-optimize-your-requirejs-project

    http://requirejs.org/docs/optimization.html

    https://github.com/jrburke/r.js/blob/master/build/example.build.js

    https://github.com/CaryLandholt/AngularFun/blob/master/Gruntfile.coffee
  */

  // https://github.com/kvindasAB/angular-enterprise-kickstart/blob/master/Gruntfile.js#L303
  compile: {
    options: {
      optimize: "uglify2",
      baseUrl: './<%= project.paths.build %>/',

      mainConfigFile: './<%= project.require.build %>',

      name: '<%= project.require.name %>',
      out: './<%= project.paths.dist %>/<%= project.require.name %>.js',

      useStrict: true,
      wrap: {
        start: '(function() {\'use strict\';',
        end: '})();'
      }
    }
  }

};
