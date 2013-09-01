(function(win, undefined){

var doc = win.document;

// `onload` event is not supported in WebKit < 535.23 and Firefox < 9.0
var isOldWebkit = +navigator.userAgent
  .replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536;

var head = doc.getElementsByTagName('head')[0] || doc.documentElement;
var baseElement = head.getElementsByTagName('base')[0];


/**
 * Main function
 */

function loadJs(url, callback){
  var element = doc.createElement('script');

  // Add proxy callback when onload
  if('onload' in element){
    element.onload = onload;
    element.onerror = function(){
      // To do: log error
      onload();
    };
  }
  else{
    element.onreadystatechange = function(){
      if(/loaded|complete/.test(node.readyState)){
        onload();
      }
    }
  }

  // The `async` property make browser to run the script as soon as possible
  // but not to block document parsing while the script is being downloading.
  element.async = true;
  element.src = url;

  insert(element);

  function onload(){
    // Ensure only run once and handle memory lead in IE
    element.onload = element.onerror = element.onreadystatechange = null;
    element = null;
    callback();
  }
}

function loadCss(url, callback){
  var element = doc.createElement('link');
  var supportOnload = 'onload' in element;

  if(!supportOnload || isOldWebkit){
    // Begin after element 
    setTimeout(function(){
      checkCssLoaded(element, callback);
    }, 1);
  }
  else if(supportOnload){
    element.onload = onload;
    element.onerror = function(){
      // To do: log error
      onload();
    }
  }

  element.rel = 'stylesheet';
  element.href = url;

  insert(element);

  function onload(){
    // Ensure only run once and handle memory lead in IE
    element.onload = element.onerror = element.onreadystatechange = null;
    element = null;
    callback();
  }
}

/**
 * Util function
 */

function insert(element){
  baseElement ?
    head.insertBefore(element, baseElement) :
    head.appendChild(element);
}

function checkCssLoaded(element, callback){
  var sheet = element.sheet;
  var isLoaded;

  // For webkit < 536
  if(isOldWebkit){
    if(sheet){
      isLoaded = true;
    }
  }
  // For firefox < 9.0
  else if(sheet){
    try{
      if(sheet.cssRules){
        isLoaded = true;
      }
    }
    catch(error){
      if(error.name === 'NS_ERROR_DOM_SECURITY_ERR'){
        isLoaded = true;
      }
    }
  }

  setTimeout(function(){
    if(isLoaded){
      callback();
    }
    else{
      checkCssLoaded(element, callback);
    }
  }, 20);
}


/**
 * Public API
 */
win.loadJs = loadJs;
win.loadCss = loadCss;

})(this);
