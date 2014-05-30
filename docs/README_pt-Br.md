# Angular.js Enterprise Edition Boilerplate

<!-- toc -->
* [Visão Geral](#visão-geral)
* [Guia de Instalação](#guia-de-instalação)
  * [Pré-Requisitos](#pré-requisitos)
* [Guia de Uso](#guia-de-uso)
  * [Ferramentas para o Fluxo de Desenvolvimento](#ferramentas-para-o-fluxo-de-desenvolvimento)
  * [Ferramenta para Publicação no GitHub gh-pages](#ferramenta-para-publicação-no-github-gh-pages)
* [Estrutura de Diretórios](#estrutura-de-diretórios)
  * [Desenvolvimento](#desenvolvimento)
  * [Publicação](#publicação)
  * [Projeto](#projeto)
* [License](#license)

<!-- toc stop -->

## Visão Geral

Projeto Boilerplate, com ferramental de suporte para o desenvolvimento e publicação no gh-pages do GitHub

* **Importante**: para definir a comunicação com entre a aplicação frontend, com o backend (parte do servidor), observe e procure seguir a proposta [REST URL Design](rest_url_design-pt-Br.md)

## Guia de Instalação

Execute os comandos a seguir no terminal (console)

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate
$ cd publicher
$ npm install
$ cd ..
$ cd tools
$ npm install
```

### Pré-Requisitos

* Necessário ter instalado o [Git](http://git-scm.com/)

* Necessário ter instalado o [node.js (v0.10.0 ou mais recente)](http://nodejs.org/) com o npm (Node Package Manager)

  * caso esteja em um ambiente corporativo, utilizando o windows atrás de um proxy NTLM, siga estas intruções : [Utilizando o Node.js em um Windows XP sem Administrador | Javascript Brasil](http://javascriptbrasil.com/2012/11/19/utilizando-o-node-js-em-um-windows-xp-sem-administrador/)

* Necessário ter o [Grunt](https://github.com/gruntjs/grunt) instalado como um pacote global `[sudo] npm install -g grunt-cli`

## Guia de Uso

> `./` representa o diretório raíz

### Ferramentas para o Fluxo de Desenvolvimento

> Dentro do diretório `./tools`, comandos disponíveis do grunt.js

* `grunt` >> (tarefa padrão) irá executar o lintspaces, jshint nos arquivos .js para verificar a qualidade de código e limpar diretórios de construção e distribuição

  > **Atenção:** a tarefa ***lintspaces*** para verificar a padronização dos arquivos, esta depende do arquivo na raíz do repositório : `.editorconfig`

--

* `grunt build:dev` >> prepara os arquivos para desenvolvimento

* `grunt build:prod` >> prepara os arquivos para distribuição / produção, dentro do diretório `./dist`

--

* `grunt dev` >> primeiro irá executar a tarefa `build:dev`, depois disso inicia um servidor web com suporte ao livereload, o qual monitora alterações nos arquivos *.html, .css, e .js* e atualiza todos os browser e dispositivos conectados no servidor

* `grunt dev:proxy` >> além das tarefas do `grunt dev`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

* `grunt dev:sync` >> primeiro irá executar a tarefa `build:dev`, depois disso inicia um servidor web com suporte ao browser-sync, o qual monitora alterações nos arquivos *.html, .css, e .js* e atualiza todos os browser e dispositivos conectados no servidor, também mantem os dados e navegação sincronizada

* `grunt dev:syncProxy` >> além das tarefas do `grunt dev:sync`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

--

* `grunt dist` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados

* `grunt dist:proxy` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

* `grunt dist:sync` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + browser-sync para sincronizar os dados e navegação 

* `grunt dist:syncProxy` >> primeiro irá executar a tarefa `build:prod`, depois disso inicia um servidor web com os arquivos gerados + browser-sync para sincronizar os dados e navegação + proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor

--

* Para centralizar e tornar mais fácil o gerenciado das configurações das tarefas do Grunt.js, foi definido o arquivo `./tools/helpers/grunt/config/project.js`, dentre as configurações a do roteamento do proxy (ver: `backend.proxies`)

  * Plugin do Grunt.js para proxy : [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) | [Using grunt-connect-proxy](http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/)

### Ferramenta para Publicação no GitHub gh-pages

> Dentro do diretório `./publisher`, comandos disponíveis do grunt.js

* `grunt init` >> realiza o clone do projeto a partir do GitHub no diretório `./publisher/local/gh_pages` e seleciona o branch `gh-pages`, o que é utilizado para atualizar o branch `gh-pages` no GitHub

> Execute este comando uma vez, antes dos comandos a seguir

--

* `grunt publish` >> esta tarefa irá executar o comando `grunt build:prod` dentro do diretório `./tools`, então irá copiar os arquivo gerados no diretório `./dist` para `./publisher/local/gh_pages`, efetuar o commit dos arquivos e então enviar para o branch `gh-pages` no Github

* `grunt publish:dev` - esta tarefa irá copiar os arquivo do diretório `./src` para `./publisher/local/gh_pages`, efetuar o commit dos arquivos e então enviar para o branch `gh-pages` no Github

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
    /grunt
      /lib        >> processamentos auxiliares para /tasks
      /config     >> arquivos de configurações para as tarefas do grunt.js
      /tasks      >> tarefas customizadas para o grunt.js
  Gruntfile.js    >> arquivo principal de configuração do grunt.js
  package.json    >> arquivo de configuração e dependências do projeto 'tools' em node.js
```

> Caso você use o Sublime Text, veja isso: 
> 
> * [[GitHub] erkobridee / sublime-angularjs-ee-snippets](https://github.com/erkobridee/sublime-angularjs-ee-snippets) - Sublime Text 2 / 3 Snippets and Completions for Angular.js and Require.js (focused to the angularjs-ee-boilerplate code)
>

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
      >> require.load.js mapeia todos os arquivos js do diretório
         este arquivo é referenciado como dependência no /app/main/module.js
      /mock
        >> require.load.js mapeia todos os arquivos js do diretório
           este arquivo é referenciado como dependência no /require.mock.load.js

    /about
      >> módulo referenciado como denpendência no /app/main/module.js

    /help
      >> módulo referenciado como denpendência no /app/main/module.js

    /home
      >> módulo referenciado como denpendência no /app/main/module.js

    /main
      >> módulo principal da aplicação onde são carregados os demais módulos no /module.js
      >> require.load.js mapeia todos os arquivos js do diretório
         este arquivo é referenciado como dependência no /ng.app.js

  /shared
    /fallback   >> scripts para Internet Explorer
    /fend
      >> conjunto de módulos úteis reutilizáveis entre projetos e outros módulos
    /mock
      >> módulo que possibilita emular o backend
    /less
      /bootstrap
          default.less >> thema e configuração padrão para o Bootstrap, que é importado no /less/app.less
      >> outros componentes e configurações

  /less
    app.less >> mapeia todos os arquivos .less que gera /styles/app.css

  /styles
    app.css

  /vendor
    >> bibliotecas de terceiros (ex.: twitter bootstrap, jquery, angular.js, ...)

  
  require.mock.load.js  >> lista e referencia todos os mocks a serem carregados
                        >> este arquivo é referenciado como dependência no /ng.app.js
  
  ng.app.js             >> onde inicializa a aplicação Angular.js

  require.config.js     >> arquivo principal de configuração do projeto onde são carregados todos os arquivos JavaScript necessários para executar /ng.app.js

  index.html
```

## License

MIT : [erkobridee.mit-license.org](http://erkobridee.mit-license.org)
