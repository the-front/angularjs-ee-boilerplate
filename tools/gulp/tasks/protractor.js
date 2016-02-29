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
        configFile: $.config.protractor.configFile,

        // https://github.com/angular/protractor/issues/66#issuecomment-186333950
        args: ['--baseUrl', 'http://' + $.localip + ':' + $.config.webserver.port + '?protractor-test']
      })).on('error', function(e) {
        console.log('ERRO!');
        console.log(e);
        cb();
      }).on('end', function(){
        cb();
      });
    });
  }

  if(
      $._.isObject($.config.protractor) &&
      $._.isObject($.config.protractor.tests)
  ){
      if( $._.isString($.config.protractor.tests.all)  ){
        configProgractorTask('protractor', [$.config.protractor.tests.all]);
      }

      if( $._.isArray($.config.protractor.tests.suites) ){
        $.config.protractor.tests.suites.forEach(function(suite){
          configProgractorTask('protractor:suite:' + suite.name, suite.files);
        });
      }
  }

};
