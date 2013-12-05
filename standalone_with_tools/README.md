# Angular.js Boilerplate

Projeto Standalone, com ferramental de suporte para o desenvolvimento

* **Importante**: para definir a comunicação com entre a aplicação frontend, com o backend (parte do servidor), observe e procure seguir a proposta [REST URL Design](https://gist.github.com/erkobridee/3868035)


## TODO

* definir e/ou usar um componente para o NavBar


## Guia de Instalação

### Clone

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate/standalone_with_tools/
```

## Guia de Uso

### tools : ferramenta de apoio ao desenvolvimento

> ferramenta de suporte ao desenvolvimento, a qual é uma aplicação em node.js com o executor de tarefas : grunt.js, a qual verifica a qualidade do código javascript, levanta um servidor com o conteúdo do diretório `/src` e utiliza a funcionalidade de *livereload*, atualizando a página conforme as atualizações dos arquivos : html, css e js

* necessário ter o [node.js](http://nodejs.org/) instalado no computador

  * caso esteja em um ambiente corporativo, utilizando o windows atrás de um proxy NTLM, siga estas intruções : [Utilizando o Node.js em um Windows XP sem Administrador | Javascript Brasil](http://javascriptbrasil.com/2012/11/19/utilizando-o-node-js-em-um-windows-xp-sem-administrador/)

* necessário ter o [grunt.js](http://gruntjs.com/) instalado globalmente no computador `npm install -g grunt-cli`, outras instruções : [Getting Started](http://gruntjs.com/getting-started)

* dentro do diretório `/tools`, execute o comando :  `npm install` para instalar as dependências necessárias


### grunt : tarefas disponíveis

> dentro do diretório `/tools` execute um dos comandos a seguir

* `grunt helloWorld` >> executa a tarefa customizada de exemplo, ver diretório `/helpers/grunt/tasks`

* `grunt` >> irá o jshint nos arquivos .js para verificar a qualidade de código

* `grunt dev` >> irá executar o jshint, iniciar o servidor com suporte ao livereload e irá verificar se houve alterações nos arquivos *.html, .css, ou .js* para atualizar a página automaticamente

* `grunt dev_proxy` >> além das tarefas do `grunt dev`, irá criar um proxy para rotear as requisições de um contexto, por exemplo: `/rest`, para outro servidor. 

  * Para configurar o roteamento do proxy, altere o arquivo: `/tools/helpers/grunt/config/app.js`, a configuração: `dev_server.proxies` 

  * O suporte do proxy utiliza o plugin : [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) | [Using grunt-connect-proxy](http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/)



## Estrutura de diretórios

### Ferramentas

```
/tools
  /node_modules >> diretório gerenciado pelo node.js onde são instaladas as dependências
  /helpers
    /grunt
      /config >> arquivos de configurações das funcionalidades 
      /tasks  >> definição de tarefas customizadas caso necessário
  Gruntfile.js  >> configurações para o grunt.js
  package.json  >> definição das dependências
```


### Projeto

> o projeto segue uma orientação modular, conforme a [proposta](https://gist.github.com/erkobridee/6933795#projeto-modular)

```
/src
  /app
    /404
      tpl.html
    /about
      tpl.html
      controller.js
    /help
      tpl.html
      controller.js
    /home
      tpl.html
      controller.js
    /main
      /layout
        footer.tpl.html
        ie-warning-alert.tpl.html
        navbar.tpl.html
      controller.js
      module.js
      routes.js
      start.js 
    require.config.js     
    /shared
      # componentes e outros recursos compartilhados no projeto o qual podem potencialmente ser reutilizados em um novo projeto
      /components
        /progressbar/loading
          config.interceptor.js
          factory.progress.config.js
          factory.progress.status.js
          module.js
          ngProgress.less
          start.js
          require.config.js
    /styles
      /less
        app.less
      app.css
    /vendor
      # bibliotecas, css e outros recursos de terceiros utilizados no projeto, ex.: twitter bootstrap  
  index.html
  require.config.js
```

## Licença

MIT : [erkobridee.mit-license.org](http://erkobridee.mit-license.org)
