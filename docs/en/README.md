# Angular.js Enterprise Edition Boilerplate

This boilerplate (seed project, starting project) helps you build large scale [Angular.js](https://angularjs.org/) applications with [Require.js](http://requirejs.org/)

--

<!-- toc -->

* [Overview](#overview)
* [Installation Guide](#installation-guide)
  * [Prerequisites](#prerequisites)
* [Use Guide](#use-guide)
  * [Tools for Development Workflow](#tools-for-development-workflow)
    * [Code Generation](#code-generation)
    * [Development](#development)
    * [Distribuction](#distribuction)
    * [Tests](#tests)
    * [Tools Configuration](#tools-configuration)
    * [Tips](#tips)
    * [Known Issues](#known-issues)
  * [Publishing tool for GitHub gh-pages](#publishing-tool-for-github-gh-pages)
* [Directories Structure](#directories-structure)
  * [Development](#development)
  * [Publishing](#publishing)
  * [Project](#project)

<!-- toc stop -->

## Overview

FrontEnd Boilerplate project with development and publishing tools (for GitHub gh-pages)

* **Important:**

  * to define a better communication between frontend and backend (server), please consider follow the given proposal [REST URL Design](rest_url_design.md)

  * `./tools` and `./publisher` are based on [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

## Installation Guide

Enter the following commands in the terminal

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate
$ npm install
$ cd publisher
$ npm install
```

> `./publisher` - installation is optional, used to deploy distribution version on `gh-pages` branch

### Prerequisites

* Must have [Git](http://git-scm.com/) installed

* Must have [node.js (at least v4.2.5)](http://nodejs.org/) installed with npm (Node Package Manager)

* Must have [Gulp](http://gulpjs.com/) node package installed globally

## Use Guide

> `./` means root directory

### Tools for Development Workflow

  > **Attention:** the following task **lintspaces** will verify the patterns insides files according rules inside `.editorconfig` in the root directory

#### Code Generation

* `gulp generate` - ask for which code generate option you want, values for the chosen and finally output destination, templated available on `./tools/lib/generate/templates`

#### Development

* `gulp` - prepare and execute development workflow

#### Distribuction

* `gulp --release` - generate distribuction version on `./dist`

* `gulp --preview` - generate distribuction version on `./dist` and start webserver to check application

#### Tests

##### Unit Tests

> karma configs defined on `./tools/karma.options.js`, gulp tasks configs defined on `./tools/karma.config.js` and loaded on `./tools/config.js`

* `gulp --karma` - run development and karma tests flow

* `gulp karma:specs` - start karma process and watch for project or test js file change

* `gulp karma:coverage` - run karma tests and generate coverage report on `./tests_out/coverage/html/`

##### e2e (end-to-end) - Selenium Tests

> protractor global configs defined on `./tools/protractor.config.js` and loaded and specified on `./tools/config.js`

* `gulp --e2e` - generate distribuction files and after it start webserver and execute e2e tests

* `gulp --protractor={suiteName}` - prepare webserver and run one suite test defined on `./tools/config.js`

#### Tools Configuration

* Tools global configs: `./tools/config.js` which is loaded on `./tools/gulp/helpers/$.js` this one is injected on each `./tools/gulp/tasks` file

#### Tips

* If you use Sublime Text, check this out:

  * [[GitHub] the-front / sublime-angularjs-ee-snippets](https://github.com/the-front/sublime-angularjs-ee-snippets) - Sublime Text 2 / 3 Snippets and Completions for Angular.js, Angular UI Router and Require.js (focused to the angularjs-ee-boilerplate code)

  * [[GitHub] caiogondim / jasmine-sublime-snippets](https://github.com/caiogondim/jasmine-sublime-snippets) - Snippets for Jasmine, the BDD framework for testing JavaScript, in Sublime Text

#### Known Issues

##### Mac OSX

* [How do I fix the error EMFILE: Too many opened files? | grunt-contrib-watch - GitHub](https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files)

  * [[SuperUser] How to change default ulimit values in Mac OS X 10.6?](https://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6)

  This is because of your system's max opened file limit.
  For OSX the default is very low (256).
  Temporarily increase your limit with `ulimit -n 2048`,
  the number being the new max limit.

  In some versions of OSX the above solution doesn't work.
  In that case try `launchctl limit maxfiles 2048 2048` and restart your terminal.

##### Windows

* Behind a NTLM proxy

  * run `npm install` two times, to install all dependencies

##### Protracto & Selenium - Firefox dos not work

* When you uptade to last Firefox version and Selenium stop to work with

  * keep selenium server jar always up to date

### Publishing tool for GitHub gh-pages

> Inside `./publisher` directory

* `gulp --publish` - this task will invoke `gulp --release` command at root, then copy generated files from `./dist` to `./publisher/.local`, commit files and finally push to `gh-pages` branch on GitHub

## Directories Structure

```
./
  /src            >> project source
  /tools          >> development tools
  /publisher      >> publisher tool
  gulpfile.js     >> main gulp.js file
  package.json    >> node.js project and dependencies configuration
```

### Development

> `./tools/gulp` based on [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

```
/tools
  /gulp
  /lib                   >> auxiliary processing
  /scripts               >> useful scripts used on npm scripts
  /tests
    require.config.js    >> load application files and test's specs for Karma Runner
  config.js              >> global configs to gulp tasks
  karma.config.js        >> karma tasks configs loaded on `config.js`
  karma.options.js       >> karma configs used on `karma.config.js`
  protractor.config.js   >> protractor config file used with protractor process
```


### Publishing

> `./publisher/gulp` based on [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

```
/publisher
  /gulp
  gulpfile.js     >> main gulp.js file
  package.json    >> node.js `publisher` project and dependencies configuration
```


### Project

> The directories structure of the project is organized following the BDD (Behavior Driven Development [wikipedia](https://en.wikipedia.org/wiki/Behavior-driven_development)) concept, where all one "use case" (behavior) is inside the same directory, which this allow code and behavior reuse

```
/src
  /app

    /bookmarks >> CRUD example with mock
      >> package.js map all js files in the directory
         this file is referenced as a dependency on /app/main/module.js
      /mock
        >> package.js map all js files in the directory
           this file is referenced as a dependency on /require.mock.load.js
      /tests/unit
        >> package.js map all js files in the directory
           this file is referenced as a dependency on /require.unit.load.js
      /tests/e2e
        >> files loaded from Protractor config specs regexp

    /about
      >> module referenced as a dependency on /app/main/module.js

    /help
      >> module referenced as a dependency on /app/main/module.js

    /home
      >> module referenced as a dependency on /app/main/module.js

    /main
      >> main application module where other modules are charged on /module.js
      >> package.js map all js files in the directory
         this file is referenced as a dependency on /ng.app.js

  /shared
    /fallback
      >> scripts for Internet Explorer
    /fend
      >> set of commons and useful reusable modules across projects and other modules
    /mock
      >> module that enables emulate the backend
    /less
      /bootstrap
          default.less >> default theme and configuration for Bootstrap,
                          which is imported in /less/app.less
      >> other configurations and components

  /less
    app.less >> map .less files that generate /styles/app.css

  /styles
    app.css

  /vendor
    >> third party libraries (ex.: twitter bootstrap, jquery, angular.js, ...)


  require.mock.load.js  >> list and reference all mocks to be loaded
                           this file is referenced as a dependency on /ng.app.js

  require.unit.load.js  >> list and reference all tests unit to be loaded
                           this file is referenced as dependency on
                           ./tools/helpers/tests/require.config.js

  ng.app.js             >> where start Angular.js application

  require.config.js     >> main configuration file to load all needed JavaScripts
                           files to execute /ng.app.js

  index.html
```
