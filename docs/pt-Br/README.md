# Angular.js Enterprise Edition Boilerplate

Este projeto "clichê" (semente, inicial) irá lhe ajudar na construção de aplicações de grande escala, usando o [Angular.js](https://angularjs.org/) com [Require.js](http://requirejs.org/)

--

<!-- toc -->

* [Visão Geral](#visão-geral)
* [Guia de Instalação](#guia-de-instalação)
  * [Pré-Requisitos](#pré-requisitos)
* [Guia de Uso](#guia-de-uso)
  * [Ferramentas para o Fluxo de Desenvolvimento](#ferramentas-para-o-fluxo-de-desenvolvimento)
    * [Construção](#construção)
    * [Geração de Código](#geração-de-código)
    * [Desenvolvimento](#desenvolvimento)
    * [Visualização da versão de Distribuição](#visualização-da-versão-de-distribuição)
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

* **Importante**: para definir a comunicação com entre a aplicação frontend, com o backend (parte do servidor), observe e procure seguir a proposta [REST URL Design](rest_url_design.md)


## Guia de Instalação

Execute os comandos a seguir no terminal (console)

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate
$ cd tools
$ npm run setup
$ cd ..
$ cd publisher
$ npm install
```


### Pré-Requisitos

* Necessário ter instalado o [Git](http://git-scm.com/)

* Necessário ter instalado o [node.js (v0.10.0 ou mais recente)](http://nodejs.org/) com o npm (Node Package Manager)

  * caso esteja em um ambiente corporativo, utilizando o windows atrás de um proxy NTLM, siga estas intruções : [Utilizando o Node.js em um Windows XP sem Administrador | Javascript Brasil](http://javascriptbrasil.com/2012/11/19/utilizando-o-node-js-em-um-windows-xp-sem-administrador/)

* Necessário ter o [Grunt](https://github.com/gruntjs/grunt) instalado como um pacote global


## Guia de Uso

> `./` representa o diretório raíz

### Ferramentas para o Fluxo de Desenvolvimento

> Dentro do diretório `./tools`, comandos disponíveis do grunt.js

* `grunt` >> (tarefa padrão) irá executar o lintspaces, jshint nos arquivos .js para verificar a qualidade de código e limpar diretórios de construção e distribuição

  > **Atenção:** a tarefa ***lintspaces*** para verificar a padronização dos arquivos, esta depende do arquivo na raíz do repositório : `.editorconfig`

#### Construção

* `grunt build:dev` >> prepara os arquivos para desenvolvimento, dentro do diretório `./tools/.temp`

* `grunt build:prod` >> limpa os diretórios de build, executa os testes e então prepara os arquivos para distribuição / produção, dentro do diretório `./dist`

#### Geração de Código

* `grunt generate` >> pergunta qual opção de geração de código você deseja, os respectivos valores para a opção escolhida e finalmente o destino de criação dos arquivos

#### Desenvolvimento

* `grunt dev:livereload` >> primeiro irá executar a tarefa `build:dev`, depois disso inicia um servidor web com suporte ao livereload, o qual monitora alterações nos arquivos *.html, .css, e .js* e atualiza todos os browser e dispositivos conectados no servidor

* `grunt dev:livereload:proxy` >> além das tarefas do `dev:livereload`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

* `grunt dev:sync` >> primeiro irá executar a tarefa `build:dev`, depois disso inicia um servidor web com suporte ao browser-sync, o qual monitora alterações nos arquivos *.html, .css, e .js* e atualiza todos os browser e dispositivos conectados no servidor, também mantem os dados e navegação sincronizada

* `grunt dev:sync:proxy` >> além das tarefas do `dev:sync`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

##### alias

  * `grunt dev` >> alias para `grunt dev:livereload`

  * `grunt dev:proxy` >> alias para `grunt dev:livereload:proxy`

#### Visualização da versão de Distribuição

* `grunt dist` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados

* `grunt dist:proxy` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

* `grunt dist:sync` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + browser-sync para sincronizar os dados e navegação

* `grunt dist:sync:proxy` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + browser-sync para sincronizar os dados e navegação + proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

#### Testes

##### Testes Unitários

* `grunt ci` - limpa os diretórios de build, executa a tarefa `karma:ci` do grunt que executa os testes

* `grunt reports` - limpa os diretórios de build, executa a tarefa `karma:reports` do grunt que gera os relatórios html de cobertura e teste, então abre o diretório onde os relatórios foram gerados

* `grunt specs` - primeiro gera os relatórios html de cobertura e teste, inicia o karma com watch e um webserver com livereload observando os arquivos html dos relatórios, que são regerados a cada execução do karma

> **Atenção:** caso queira executar com o fluxo de desenvolvimento, execute primeiro a tarefa de desenvolvimento (ex.: `grunt dev`) em um terminal e em outro terminal execute `grunt specs`

##### Testes e2e (end-to-end) - Selenium

* `grunt e2e` - primeiro irá executar a tarefa `build:prod`, iniciar um servidor web com suporte a proxy e então executará os testes e2e com o Protractor

* `grunt protractor` - executa apenas os testes e2e

> **Atenção:** precisa executar em conjunto do fluxo de desenvolvimento, execute primeiro a tarefa de desenvolvimento (ex.: `grunt dev`) em um terminal e em outro terminal execute `grunt protrator`, ou para executar um suite de testes específico `grunt protractor --suite bookmarks` (configuração para o Protractor: `./tools/config.protractor.js`)

#### Configurações do Ferramental

* Configurações globais do ferramental: `./tools/config.js`, as quais são utilizadas no `./tools/helpers/grunt/config/project.js`

  * Configurações para o roteamendo do proxy ( ver: `var backend = { ...` ) 

    * Plugin do Grunt.js para proxy : [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) | [Using grunt-connect-proxy](http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/)

  * Para centralizar e tornar mais fácil o gerenciado das configurações das tarefas do Grunt.js, foi definido o arquivo `./tools/helpers/grunt/config/project.js`

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

  * **Solução:** `mantenha o jar do servidor Selenium sempre atualizado com a última versão`

### Ferramenta para Publicação no GitHub gh-pages

> Dentro do diretório `./publisher`, comandos disponíveis do grunt.js

* `grunt init` >> realiza o clone do projeto a partir do GitHub no diretório `./publisher/local/gh-pages` e seleciona o branch `gh-pages`, o que é utilizado para atualizar o branch `gh-pages` no GitHub

> Execute este comando uma vez, antes dos comandos a seguir

--

* `grunt publish` >> esta tarefa irá executar o comando `grunt build:prod` dentro do diretório `./tools`, então irá copiar os arquivo gerados no diretório `./dist` para `./publisher/local/gh-pages`, efetuar o commit dos arquivos e então enviar para o branch `gh-pages` no Github

* `grunt publish:dev` - esta tarefa irá copiar os arquivo do diretório `./src` para `./publisher/local/gh-pages`, efetuar o commit dos arquivos e então enviar para o branch `gh-pages` no Github


## Estrutura de Diretórios

```
./
  /src        >> fontes do projeto
  /tools      >> ferramentas de desenvolvimento
  /publisher  >> ferramenta de publicação
```


### Desenvolvimento

```
/tools
  /helpers
    /lib                 >> processamentos auxiliares
    /scripts             >> processamentos de automação
    /html_report_template
      jasmine.html       >> template de relatório html do jasmine
    /grunt
      /config            >> arquivos de configurações para as tarefas do grunt.js
      /tasks             >> tarefas customizadas para o grunt.js
    /tests
      require.config.js  >> carrega os arquivos e testes da aplicação para o Karma Runner
  /templates             >> arquivos de templates para a tarefa generate do grunt.js
  config.js              >> configurações globais para as tarefas do grunt.js
  config.karma.js        >> referenciado no config.js
  config.protractor.js   >> configurações para o Protractor
  Gruntfile.js           >> arquivo principal de configuração do grunt.js
  package.json           >> arquivo de configuração e dependências do projeto 'tools' em node.js
```


### Publicação

```
/publisher
  /helpers
    /grunt
      /config     >> arquivos de configurações para as tarefas do grunt.js
      /tasks      >> tarefas customizadas para o grunt.js
  Gruntfile.js    >> arquivo principal de configuração do grunt.js
  package.json    >> arquivo de configuração e dependências do projeto 'publisher' em node.js
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
