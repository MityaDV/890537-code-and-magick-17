'use strict';

(function () {

  var SET_TIMEOUT_INTERVAL = 500;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, SET_TIMEOUT_INTERVAL);
    };
  };

})();
