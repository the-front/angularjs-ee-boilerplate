// Angular.js fallback
(function() {
  var length, customTags = ['ng-include', 'ng-pluralize', 'ng-view', 'ng-repeat']
    //.concat(['tabs', 'pane']) // TODO: ADD HERE APP CUSTOM TAGS
    .concat(['ng:include', 'ng:pluralize', 'ng:view']); // Optionally these for CSS
  length = customTags.length;
  while (length--) { document.createElement(customTags[length]); }
})();

// IE - Avoid `console` errors in browsers that lack a console.
(function() {
  var console, length, method, noop = function () {},
  methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  length = methods.length;
  console = (window.console = window.console || {});
  while (length--) {
    method = methods[length];
    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
