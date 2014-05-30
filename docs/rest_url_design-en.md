# REST URL design


<!-- toc -->
* [Overview](#overview)
* [GET, UPDATE, DELETE](#get-update-delete)
* [GET, POST](#get-post)
* [GET](#get)
  * [Pagination](#pagination)
  * [Search and pagination](#search-and-pagination)
  * [Utilities](#utilities)
* [Denormalization](#denormalization)

<!-- toc stop -->


## Overview

> Proposed URLs for RESTful applications

**:app-name** - application name

**:rest** - context, URL part that identifies REST communication

**:version** - versoning (recommended, but not required)

**:resource** - exposed resource name (*entity*),the name should be in plural


## GET, UPDATE, DELETE

```
http://:app-name/:rest/:version/:resource/:id
```

**:id** - resource identifier

* **GET** - retrieve resource by given identifier

* **UPDATE** - update resource by given identifier, sending resource data inside request body

* **DELETE** - send delete command for resource by given identifier


## GET, POST

```
http://:app-name/:rest/:version/:resource
```

* **GET** - retrieve resources list

* **POST** - create new one, sending resource data inside request body

## GET

HTTP GET request with parameters

### Pagination

```
http://:app-name/:rest/:version/:resource?page=1&size=10
```

* **page** - indicates list index [ *default suggested value: 1* ]

* **size** - amount of items (resources) retrieved [ *default suggested value: 10* ]

* **selection items from database:**

_**initial index**_ = ((page-1) * size)

_**amount of selected itens**_ = size

* **proposed object model to return:**

```
{
  data:   {type: Array},  // items (resources) retrived
  count:  {type: Number}, // database count of items (resources)
  page:   {type: Number}, // current page
  pages:  {type: Number}  // available amount of pages
}
```

* **_Attention:_** it's highly recommended set default values in case some pagination request come without pagination parameters, that's prevents retrieve all items (resources) from database (keep in mind probably your database will grow beyond 100, 1000, ... items).

### Search and pagination

```
http://:app-name/:rest/:version/:resource?q=:query

http://:app-name/:rest/:version/:resource?q=:query&page=1&size=10
```

**:query** - search parameter or expression

_**Note:**_ need some specific implementation method on backend to execute this query.

### Utilities

> TODO: translate

```
http://:app-name/:rest/:version/:resource?action=:option
```

A idéia dessa proposta de URL é ter um recurso flexível para disponibilizar funcionalidades

**:option** - opção de ação solicitada. Implementações sugeridas:

* **count** - retorna a quantidade/contagem de recursos disponíveis. Esta funcionalidade/informação irá ser útil para implementação de paginação

* **template** - retorna o recurso associado a URL com os parâmetros vazios, serve para conhecer a estrutura do recurso


## Denormalization

> TODO: translate

Além das definições de URLs recomendandas acima, não é impeditivo definir outras URLs para atender necessidades específicas do seu projeto.
