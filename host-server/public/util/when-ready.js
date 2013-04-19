/*
Registered functions are invoked one time as methods of `document`
once any one of `DOMContentLoaded`, `readystatechange` and `load` event occurs.
If it's `readystatechange` event, ensure `document.readyState` reach `complete`.
All of these mean that, those callback functions will be invoked as soon as possible
after document is ready for manipulation.
*/
var documentReady = (function () {
  var ready = false, callbacks = [];

  function invokeAllCallbacks () {
    var i;

    // ensure these callbacks would be invoked one time
    if (ready) return;

    for (i in callbacks) {
      callbacks[i].call(document);
    }

    // toggle ready flag and break the reference in the context of this anonymous function
    ready = true;
    invokeAllCallbacks = null;
  }
  function readystatechangeHandler (event) {
    if (event.readyState === 'complete') invokeAllCallbacks();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', invokeAllCallbacks, false);
    document.addEventListener('readystatechange', readystatechangeHandler, false);
    window.addEventListener('load', invokeAllCallbacks, false);
  } else if (document.attachEvent) {
    document.attachEvent('readystatechange', readystatechangeHandler);
    window.attachEvent('load', invokeAllCallbacks);
  }

  return function documentReady (callback) {
    // if already ready, just run it
    if (ready) callback.call(document);
    else callbacks.push(callback);
  };
})();
