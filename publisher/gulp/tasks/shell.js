module.exports = function(gulp, $) {

  //---
  // @begin: tools

  gulp.task('shell:tools-build', $.shell.task([
    'gulp --release'
  ], {
    cwd: $.path.resolve('../')
  }));

  gulp.task('shell:tools-clean', $.shell.task([
    'gulp clean'
  ], {
    cwd: $.path.resolve('../')
  }));

  // @end: tools
  //---

  gulp.task('shell:createRepoDir', $.shell.task([
    'mkdir ' + $.config.paths.repoDir
  ]));

  //---
  // @begin: git

    // init, checkout

  gulp.task('shell:git:clone', $.shell.task([
    'git clone ' + $.mainPkg.repository.url + ' ' + $.config.paths.repoDir
  ]));


  gulp.task('shell:git:checkout', $.shell.task([
    'git checkout ' + $.config.git.branch
  ], {
    cwd: $.config.paths.repoDir
  }));

    // add, commit, push

  gulp.task('shell:git:add', $.shell.task([
    'git add . '
  ], {
    cwd: $.config.paths.repoDir
  }));

  gulp.task('shell:git:commit', $.shell.task([
    'git commit -m "' +
      $.util.template(
        $.config.git.commitMessage,
        {
          branch: $.config.git.branch,
          time: new Date().toISOString(),
          file: $.util.noop()
        }
      ) +
    '"'
  ], {
    cwd: $.config.paths.repoDir
  }));

  gulp.task('shell:git:push', $.shell.task([
    'git push origin ' + $.config.git.branch
  ], {
    cwd: $.config.paths.repoDir
  }));

  // @end: git

};
