# Angular.js Enterprise Edition Boilerplate

Este projeto "clichê" (semente, inicial) irá lhe ajudar na construção de aplicações de grande escala, usando o [Angular.js](https://angularjs.org/) com [Require.js](http://requirejs.org/)

--

<!-- toc -->

* [Visão Geral](#visão-geral)
* [Guia de Instalação](#guia-de-instalação)
  * [Pré-Requisitos](#pré-requisitos)
* [Guia de Uso](#guia-de-uso)
  * [Ferramentas para o Fluxo de Desenvolvimento](#ferramentas-para-o-fluxo-de-desenvolvimento)
    * [Geração de Código](#geração-de-código)
    * [Desenvolvimento](#desenvolvimento)
    * [Distribuição](#distribuição)
    * [Testes](#testes)
    * [Configurações do Ferramental](#configurações-do-ferramental)
    * [Dicas](#dicas)
    * [Problemas Conhecidos](#problemas-conhecidos)
  * [Ferramenta para Publicação no GitHub gh-pages](#ferramenta-para-publicação-no-github-gh-pages)
* [Estrutura de Diretórios](#estrutura-de-diretórios)
  * [Desenvolvimento](#desenvolvimento)
  * [Publicação](#publicação)
  * [Projeto](#projeto)

<!-- toc stop -->

## Visão Geral

Projeto Boilerplate, com ferramental de suporte para o desenvolvimento e publicação no gh-pages do GitHub

* **Importante:**

  * para definir a comunicação com entre a aplicação frontend, com o backend (parte do servidor), observe e procure seguir a proposta [REST URL Design](rest_url_design.md)

  * `./tools` e `./publisher` são baseados no [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

## Guia de Instalação

Execute os comandos a seguir no terminal (console)

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate
$ cd tools
$ npm install
$ cd ..
$ cd publisher
$ npm install
```

> `./publisher` - a instalação é opcional, utilizado para publicar a versão de distribuição no branch `gh-pages`


### Pré-Requisitos

* Necessário ter instalado o [Git](http://git-scm.com/)

* Necessário ter instalado o [node.js (v4.2.5 ou mais recente)](http://nodejs.org/) com o npm (Node Package Manager)

  * caso esteja em um ambiente corporativo, utilizando o windows atrás de um proxy NTLM, siga estas intruções : [Utilizando o Node.js em um Windows XP sem Administrador | Javascript Brasil](http://javascriptbrasil.com/2012/11/19/utilizando-o-node-js-em-um-windows-xp-sem-administrador/)

* Necessário ter o [Gulp](http://gulpjs.com/) instalado como um pacote global


## Guia de Uso

> `./` representa o diretório raiz

### Ferramentas para o Fluxo de Desenvolvimento

  > **Atenção:** a tarefa ***lintspaces*** para verificar a padronização dos arquivos, esta depende do arquivo na raiz do repositório : `.editorconfig`

#### Geração de Código

* `gulp generate` - pergunta qual opção de geração de código você deseja, os respectivos valores para a opção escolhida e finalmente o destino de criação dos arquivos

#### Desenvolvimento

* `gulp` - prepara e executa o fluxo de desenvolvimento

#### Distribuição

* `gulp --release` - gera a versão de distribuição no diretório `./dist`

* `gulp --preview` - gera a versão de distribuição no diretório `./dist` e inicia um servidor web para verificar a aplicação

#### Testes

##### Testes Unitários

> as configurações do karma estão definidas no arquivo `./tools/karma.options.js`, as configurações para as tasks gulp definidas no arquivo `./tools/karma.config.js` e carregadas no arquivo `./tools/config.js`

* `gulp --karma` - executa o fluxo de desenvolvimento e testes do karma

* `gulp karma:specs` - inicia o processo do karma e monitora as alterações dos arquivos js do projeto e de testes onde a cada alteração o karma executa novamente os testes

* `gulp karma:coverage` - executa os testes do karma e gera o relatório de cobertura no diretório `./tests_out/coverage/html`

##### Testes e2e (end-to-end) - Selenium

> as configurações globais para o protractor estão definidas no arquivo `./tools/protractor.config.js`, sendo carregado e especificada no arquivo `./tools/config.js`

* `gulp --e2e` - gera a versão de distribuição, inicia o servidor web e então executa todos os testes e2e

* `gulp --protractor={suiteName}` - prepara o servidor web e executa um conjunto de teste (suite) definido no arquivo `./tools/config.js`

#### Configurações do Ferramental

* Configurações globais do ferramental: `./tools/config.js`, as quais são carregadas no arquivo `./tools/gulp/helpers/$.js` e injetada em cada arquivo de task do gulp `./tools/gulp/tasks`

#### Dicas

* Caso você use o Sublime Text, veja isso:

  * [[GitHub] the-front / sublime-angularjs-ee-snippets](https://github.com/the-front/sublime-angularjs-ee-snippets) - Sublime Text 2 / 3 Snippets and Completions for Angular.js, Angular UI Router and Require.js (focused to the angularjs-ee-boilerplate code)

  * [[GitHub] caiogondim / jasmine-sublime-snippets](https://github.com/caiogondim/jasmine-sublime-snippets) - Snippets for Jasmine, the BDD framework for testing JavaScript, in Sublime Text

#### Problemas Conhecidos

##### Mac OSX

* [Como eu conserto o erro EMFILE: Muitos arquivos abertos? | grunt-contrib-watch - GitHub](https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files)

  * [[SuperUser] How to change default ulimit values in Mac OS X 10.6?](https://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6)

  Isto porque o sistema limita a quantidade máxima de arquivos abertos.
  Para o OSX o valor padrão é muito baixo (256).
  Para aumentar temporariamente este limite use o comando `ulimit -n 2048`,
  este número será o novo limite máximo.

  Em algumas versões do OSX a solução acima não funciona.

  Neste caso tente `launchctl limit maxfiles 2048 2048` e reinicie
  o terminal.

##### Windows

* Atrás de um proxy NTLM

  * execute duas vezes o comando `npm install`, para instalar todas as dependências

##### Protracto e Selenium - Firefox não funciona

* Quando você atualizar para a última versão do Firefox e o Selenium parar de funcionar

  * mantenha o jar do servidor Selenium sempre atualizado com a última versão

### Ferramenta para Publicação no GitHub gh-pages

> Dentro do diretório `./publisher`

* `gulp --publish` - essa tarefa irá invocar o comando `gulp --release` na raiz do projeto, então após gerar a versão de distribuição irá copiar os arquivos do diretório `./dist` para o diretório `./publisher/.local`, efetua os commit e sincroniza o branch `gh-pages` com o GitHub

## Estrutura de Diretórios

```
./
  /src          >> fontes do projeto
  /tools        >> ferramentas de desenvolvimento
  /publisher    >> ferramenta de publicação
  gulpfile.js   >> arquivo principal do gulp.js
  package.json  >> arquivo de configuração e dependências do node.js
```


### Desenvolvimento

> `./tools/gulp` baseado no [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

```
/tools
  /gulp
  /lib                   >> processamentos auxiliares
  /scripts               >> scripts úteis utilizado no npm scripts
  /tests
    require.config.js    >> carrega os arquivos e testes da aplicação para o Karma Runner
  config.js              >> configurações globais para as tarefas do gulp.js
  karma.config.js        >> configuração das tasks karma carregadas no arquivo `config.js`
  karma.options.js       >> configurações do karma usado no arquivo `karma.config.js`
  protractor.config.js   >> arquivo de configuração do protractor utilizados pela execução do protractor
```

### Publicação

> `./publisher/gulp` baseado no [[GitHub] soudev / gulp-steps](https://github.com/soudev/gulp-steps) - [04](https://github.com/soudev/gulp-steps/tree/master/04)

```
/publisher
  /gulp
  gulpfile.js     >> arquivo principal do gulp.js
  package.json    >> dependências node.js para as dependencias do `./publisher`
```

### Projeto

> A estrutura de diretórios do projeto está organizada seguindo o conceito BDD (Behavior Driven Development [wikipedia](https://pt.wikipedia.org/wiki/Behavior_Driven_Development)), onde todo um "caso de uso" (comportamento) está dentro de um mesmo diretório, o que possibilita o reúso de código e comportamento

```
/src
  /app

    /bookmarks >> exemplo CRUD com mock
      >> package.js mapeia todos os arquivos js do diretório
         este arquivo é referenciado como dependência no /app/main/module.js
      /mock
        >> package.js mapeia todos os arquivos js do diretório
           este arquivo é referenciado como dependência no /require.mock.load.js
      /tests/unit
        >> package.js mapeia todos os arquivos js do diretório
           este arquivo é referenciado como dependência no /require.unit.load.js
      /tests/e2e
        >> arquivos carregados pelo Protractor através de uma expressão regular

    /about
      >> módulo referenciado como denpendência no /app/main/module.js

    /help
      >> módulo referenciado como denpendência no /app/main/module.js

    /home
      >> módulo referenciado como denpendência no /app/main/module.js

    /main
      >> módulo principal da aplicação onde são carregados os demais módulos no /module.js
      >> package.js mapeia todos os arquivos js do diretório
         este arquivo é referenciado como dependência no /ng.app.js

  /shared
    /fallback
      >> scripts para Internet Explorer
    /fend
      >> conjunto de módulos úteis reutilizáveis entre projetos e outros módulos
    /mock
      >> módulo que possibilita emular o backend
    /less
      /bootstrap
          default.less >> thema e configuração padrão para o Bootstrap,
                          que é importado no /less/app.less
      >> outros componentes e configurações

  /less
    app.less >> mapeia todos os arquivos .less que gera /styles/app.css

  /styles
    app.css

  /vendor
    >> bibliotecas de terceiros (ex.: twitter bootstrap, jquery, angular.js, ...)


  require.mock.load.js  >> lista e referencia todos os mocks a serem carregados
                           este arquivo é referenciado como dependência no /ng.app.js

  require.unit.load.js  >> lista e referencia todos os tests a serem carregados
                           este arquivo é referenciado como dependencia no
                           ./tools/helpers/tests/require.config.js

  ng.app.js             >> onde inicializa a aplicação Angular.js

  require.config.js     >> arquivo principal de configuração do projeto
                           onde são carregados todos os arquivos JavaScript
                           necessários para executar /ng.app.js

  index.html
```
