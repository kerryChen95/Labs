describe('API:loadJs', function(){
  var pollTimes;
  var handler = {
    onload: function(){}
  };

  beforeEach(function(){
    window.businessJsFileLoaded = false;
    pollTimes = 0;

    spyOn(handler, 'onload');
  });


  it('invokes callback only once after the provided js file has been loaded', function(){

    runs(function(){
      loadJs('business.js', handler.onload);
      expect(handler.onload).not.toHaveBeenCalled();
    });

    waitsFor(function(){
      pollTimes++;
      if(!window.businessJsFileLoaded){
        expect(handler.onload).not.toHaveBeenCalled();
      }
      return window.businessJsFileLoaded;
    }, 'The js file should be loaded', 2000);

    runs(function(){
      console.log('Poll ' + pollTimes + ' times to check js file loaded');
      expect(handler.onload).toHaveBeenCalled();
      expect(handler.onload.calls.length).toEqual(1);
    });
  });
});

describe('API:loadCss', function(){
  var pollTimes;
  var handler = {
    onload: function(){}
  };

  var div = document.createElement('div');
  div.id = 'box';
  div.style.position = 'absolute';
  div.style.left = '-9999px';
  document.body.appendChild(div);

  beforeEach(function(){
    pollTimes = 0;

    spyOn(handler, 'onload');
  });


  it('invokes callback only once after the provided css file has been loaded', function(){

    runs(function(){
      expect(getComputedStyleObj(div)['left'] === '-9999px').toBeTruthy();
      expect(getComputedStyleObj).not.toThrow();
      loadCss('business.css', handler.onload);
      expect(handler.onload).not.toHaveBeenCalled();
    });

    waitsFor(function(){
      pollTimes++;
      if(getComputedStyleObj(div)['left'] === '-9999px'){
        expect(handler.onload).not.toHaveBeenCalled();
      }
      return getComputedStyleObj(div)['left'] === '9999px';
    });

    runs(function(){
      console.log('Poll ' + pollTimes + ' times to check css file loaded');
      setTimeout(function(){
        expect(handler.onload).toHaveBeenCalled();
        expect(handler.onload.calls.length).toEqual(1);
      }, 0);
    });
  });

  function getComputedStyleObj(ele){
    if('getComputedStyle' in window){
      return window.getComputedStyle(ele);
    }
    else if(ele && ele.currentStyle){
      return ele.currentStyle;
    }
  }
});
