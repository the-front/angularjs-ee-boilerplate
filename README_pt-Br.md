# Angular.js Enterprise Edition Boilerplate


<!-- toc -->
* [Visão Geral](#visão-geral)
* [Guia de Instalação](#guia-de-instalação)
  * [Clone](#clone)
* [Guia de Uso](#guia-de-uso)
  * [Ferramenta de Publicação do GitHub gh-pages](#ferramenta-de-publicação-do-github-gh-pages)
  * [Ferramenta de Apoio ao Desenvolvimento](#ferramenta-de-apoio-ao-desenvolvimento)
    * [Grunt.js: Tarefas Disponíveis](#gruntjs-tarefas-disponíveis)
* [Estrutura de diretórios](#estrutura-de-diretórios)
  * [Ferramentas](#ferramentas)
  * [Projeto](#projeto)
* [Licença](#licença)
* [TODO](#todo)

<!-- toc stop -->


## Visão Geral

Projeto Standalone, com ferramental de suporte para o desenvolvimento

* **Importante**: para definir a comunicação com entre a aplicação frontend, com o backend (parte do servidor), observe e procure seguir a proposta [REST URL Design](https://github.com/soudev/knowledge.mine/blob/master/stuff/backend.rest.url_design.md)


## Guia de Instalação

### Clone

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
```

## Guia de Uso

### Ferramenta de Publicação do GitHub gh-pages

> Ferramenta para auxiliar/automatizar a publicação/atualizar da página (gh-pages) do projeto no GitHub (presente no diretório `/publisher`)

* Tarefas do Grunt.js

  * `grunt init` -  prepara um diretário `./local/gh_pages` com o clone do projeto e o branch `gh-pages` selecionado, necessário para os comandos a seguir

  * `grunt publish` - irá gerar e publicar no `gh-pages` a versão de produção do projeto

  * `grunt publish:dev` - irá publicar no `gh-pages` a versão de desenvolvimento do projeto


### Ferramenta de Apoio ao Desenvolvimento

> Ferramenta de suporte ao desenvolvimento (presente no diretório `/tools`), a qual é uma aplicação em node.js com o executor de tarefas : grunt.js, a qual verifica a qualidade do código javascript, levanta um servidor com o conteúdo do diretório `/src` e utiliza a funcionalidade de *livereload*, atualizando a página conforme as atualizações dos arquivos : html, css e js

* necessário ter o [node.js](http://nodejs.org/) instalado no computador

  * caso esteja em um ambiente corporativo, utilizando o windows atrás de um proxy NTLM, siga estas intruções : [Utilizando o Node.js em um Windows XP sem Administrador | Javascript Brasil](http://javascriptbrasil.com/2012/11/19/utilizando-o-node-js-em-um-windows-xp-sem-administrador/)

* necessário ter o [grunt.js](http://gruntjs.com/) instalado globalmente no computador, outras instruções : [Getting Started](http://gruntjs.com/getting-started)

> caso seu sistema for UNIX (ex.: linux, mac os x, etc), provavelmente terá que executar o comando como super usuário `sudo` antes do camando 

```bash
$ [sudo] npm install -g grunt-cli
```

* dentro do diretório `/tools`, execute o comando abaixo para instalar as dependências necessárias

```bash
$ cd tools/
$ npm install
```


#### Grunt.js: Tarefas Disponíveis

> dentro do diretório `/tools` execute um dos comandos a seguir


* `grunt` >> (tarefa padrão) irá executar o lintspaces, jshint nos arquivos .js para verificar a qualidade de código e limpar diretórios de construção e distribuição

  > **Atenção:** a tarefa ***lintspaces*** para verificar a padronização dos arquivos, esta depende do arquivo na raíz do repositório : `.editorconfig`


--

* `grunt build:dev` >> executa inicialmente a tarefa padrão e compilação dos arquivos .less, gerando o `/src/styles/app.css`

* `grunt build:prod` >> executa inicialmente a tarefa padrão e depois um fluxo de otimização, minificação de arquivos para uma versão de produção, com a saída dos arquivos em um diretório `/dist`

--

* `grunt dev` >> executa inicialmente a tarefa `build:dev`, iniciar o servidor com suporte ao livereload e irá verificar se houve alterações nos arquivos *.html, .css, ou .js* para atualizar a página automaticamente

* `grunt dev:proxy` >> além das tarefas do `grunt dev`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor. 

--

* `grunt dist` >>  executa inicialmente a tarefa `build:prod` e então inicia um servidor para visualizar e testar os arquivos gerados

* `grunt dist:proxy` >> executa inicialmente a tarefa `build:prod` e então inicia um servidor + proxy, para visualizar e testar os arquivos gerados


--

* Para facilitar o gerenciamento das taferas que serão executadas pelo Grunt.js foi definido o arquivo `/tools/helpers/grunt/config/project.js`, para centralizar as principais configurações do ferramental, dentre elas a configuração de roteamento do proxy (ver: `backend.proxies`).

  * O suporte do proxy utiliza o plugin : [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) | [Using grunt-connect-proxy](http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/)


## Estrutura de diretórios

### Ferramentas

```
/tools
  /node_modules   >> diretório gerenciado pelo node.js onde são instaladas as dependências
  /helpers
    /grunt
      /lib        >> processamentos auxiliares para as /tasks
      /config     >> arquivos de configurações das funcionalidades 
      /tasks      >> definição de tarefas customizadas caso necessário
  Gruntfile.js    >> configurações para o grunt.js
  package.json    >> definição das dependências
```

> Para facilitar a configuração do ferramental, foi criado o arquivo `/tools/helpers/grunt/config/project.js` para centralizar as configurações

### Projeto

> o projeto segue uma orientação modular, conforme a [proposta](https://gist.github.com/erkobridee/6933795#projeto-modular)

```
/src
  /app

    /bookmarks >> modulo de exemplo CRUD com mock      
      >> require.load.js mapeia os arquivos .js do diretório
         este é referenciado como dependência no /app/main/module.js
      /mock
        >> require.load.js mapeia os arquivos .js do diretório
           este é referenciado como dependência no /require.mock.load.js

    /about
      >> modulo referenciado como dependência no /app/main/module.js

    /help
      >> modulo referenciado como dependência no /app/main/module.js

    /home
      >> modulo referenciado como dependência no /app/main/module.js

    /main
      >> modulo principal da aplicação onde são carregado os demais
         este é referenciado como dependência no /ng.app.js

    /shared
      /fallback   >> scripts para Internet Explorer
      /fend
        >> conjunto de módulos útis/comuns para reúso em vários projetos/modulos
      /mock
        >> módulo de suporte para simular o backend
      /less
        >> configurações de componentes CSS   

    /less
      /bootstrap
        default.less >> configuração e tema padrão do Bootstrap, importado no app.less
      app.less >> mapeamento dos arquivos .less que geram o /styles/app.css

    /styles
      app.css

    /vendor
      >> bibliotecas, css e outros recursos de terceiros utilizados no projeto, ex.: twitter bootstrap  

  ng.app.js             >> onde é iniciado a execução a aplicação Angular.js
  require.mock.load.js  >> listagem dos mocks a serem carregados
  require.config.js     >> configuração principal para o carregamento dos arquivos JavaScript

  index.html
```


## Licença

MIT : [erkobridee.mit-license.org](http://erkobridee.mit-license.org)


## TODO

* definir e/ou usar um componente para o NavBar
 
* Testar sincronização de web browsers

  * [[GitHub] shakyShane / grunt-browser-sync](https://github.com/shakyShane/grunt-browser-sync) - Grunt Task for keeping multiple browsers & devices in sync when building websites.