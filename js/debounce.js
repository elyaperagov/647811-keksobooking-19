'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout = null;
  window.debounce = function (cb) {

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

// почему не работает этот дебаунс?
// (function () {
//   var DEBOUNCE_INTERVAL = 500; // 0,5s
//   var lastTimeout;
//
//   window.debounce = function (cb) {
//     if (lastTimeout) {
//       window.clearTimeout(lastTimeout);
//     }
//     lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
//   };
//
// })();
