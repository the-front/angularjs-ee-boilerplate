Shipping 1.1.0

change code syntax from:

```javascript
// AMD Style
define(['angular'], function() {  
    return {
        /* API for this module */
    };
});
```

to:

```javascript
// CommonJS Style
define(function(require) {  
  var angular = require('angular');

  return {
    /* API for this module */
  };
});
```

--

* `src/` update code syntax
  - `src/app`
  - `src/shared`

* `toos/`
  - update templates code syntax

--

ISSUES:

* #18  >  src/app/ - update code syntax

* #19  >  src/shared/ - update code syntax


* #20  >  tools/ - update templates code syntax
