module.exports = function(gulp, $) {

  gulp.task('clean:repo-dir', $.del.bind(null, [
    $.config.paths.repoDir
  ]));

  gulp.task('clean:repo-dir:content', $.del.bind(null, [
    $.config.paths.repoDir + '/' + '/**/*',
    '!' + $.config.paths.repoDir + '/{.git,.gitignore}'
  ]));

  gulp.task('clean', ['clean:repo-dir']);

};
