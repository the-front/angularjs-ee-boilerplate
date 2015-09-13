var testModuleThenExecute = require('../lib/testModuleThenExecute');

testModuleThenExecute('shelljs', function executeLater() {

  // http://documentup.com/arturadib/shelljs
  require('shelljs/global');

  var oscheck = require('../lib/oscheck');

  var sudoStr =  (oscheck.isLinux || oscheck.isMac) ? 'sudo ' : '';
  var cmd = '';

  echo('About to setup environment');
  echo('It works if it finishes with OK');

  var installedSomeGlobalFlag = false;

  echo('----------------------------------------');

  if(!which('gulp')) {
    echo('gulp is missing...taking care of that now.');
    cmd = sudoStr + 'npm install --global gulp';
    echo(cmd); exec(cmd);
    installedSomeGlobalFlag = true;
  }
  echo('gulp --version ');
  echo(exec('gulp --version', {silent:true}).output);

  echo('----------------------------------------');

  echo('Installing node dependencies...\n');
  exec('npm install');


  echo('\nOK!\n');

});
