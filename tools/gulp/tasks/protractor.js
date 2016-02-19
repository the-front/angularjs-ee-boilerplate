module.exports = function(gulp, $) {

var protractor = require('gulp-protractor').protractor,
    webdriver_update = require('gulp-protractor').webdriver_update,
    webdriver_standalone = require('gulp-protractor').webdriver_standalone;

  // Downloads the selenium webdriver
  gulp.task('protractor:webdriver_update', webdriver_update);

  // Start the standalone selenium server
  // NOTE: This is not needed if you reference the
  // seleniumServerJar in your protractor.conf.js
  gulp.task('protractor:webdriver_standalone', ['protractor:webdriver_update'], webdriver_standalone);

  function configProgractorTask(name, files) {
    gulp.task(name, ['protractor:webdriver_update'], function(cb) {
      gulp.src(files).pipe(protractor({
        configFile: $.config.protractor_config,
        args: ['--baseUrl', 'http://' + $.localip + ':' + $.config.webserver.port]
      })).on('error', function(e) {
        console.log('ERRO!');
        console.log(e);
        cb();
      }).on('end', function(){
        cb();
      });
    });
  }

  configProgractorTask('protractor', ['src/**/e2e/**/*.js']);

  var suites = [
    {name: 'home', files: ['src/app/home/**/tests/e2e/*.spec.js']},
    {name: 'about', files: ['src/app/about/**/tests/e2e/*.spec.js']},
    {name: 'help', files: ['src/app/help/**/tests/e2e/*.spec.js']},
    {name: 'bookmarks', files: ['src/app/bookmarks/**/tests/e2e/*.spec.js']}
  ];

  suites.forEach(function(suite) {
    configProgractorTask('protractor:suite:' + suite.name, suite.files);
  });

};
