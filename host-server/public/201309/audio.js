var FLASH_TMPL = '\
  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;"> \
    <param name="movie" value="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3"> \
    <param name="allowscriptaccess" value="always"> \
    <embed name="$1" src="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always"> \
  </object>';
var SWF_URL = '';

var nav = navigator,
    doc = document;

var defaultSetting = {
        preload: true,
        autoplay: false
    };
var supportAudio = (function() {
        var elem = document.createElement('audio'),
            bool = false;
        try {
            if (bool = !!elem.canPlayType) {
              bool      = new Boolean(bool);
              bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
              bool.mp3  = elem.canPlayType('audio/mpeg;').replace(/^no$/,'');
              bool.wav  = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');
              bool.m4a  = ( elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;') ).replace(/^no$/,'');
            }
        } catch(e) { }
        return bool;
    }),
    hasFlash = (function() {
        if(nav.plugins && nav.plugins.length && nav.plugins['Shockwave Flash']){
            return true;
        }
        else if(nav.mimeTypes && nav.mimeTypes.length){
            var mimeType = nav.mimeTypes['application/x-shockwave-flash'];
            return mimeType && mimeType.enabledPlugin;
        }
        else{
            var ax;
            try{
                if(ActiveXObject){
                    ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    return true;
                }
            }
            catch(e){}
        }
        return false;
    })();

// Setting `autoplay` to `true` implies that the browser should preload media data
var AudioInstance = function(src, setting) {
    var id, s, key, elem;
    if(!src) {return;}

    AudioInstance.count++;
    id = 'audioInstance' + AudioInstance.count;

    // Set instance properties
    this.src = src;
    this.loaded = false;
    s = {};
    for(key in defaultSetting){
        if(defaultSetting.hasOwnProperty(key)){
            s[key] = ( (key in setting) && (typeof setting[key] === 'boolean') ) ?
                setting[key] :
                defaultSetting[key];
        }
    }
    this.setting = s;

    // Create and insert elements,
    // and load audio file if preload is true
    if(supportAudio){
        elem = this.element = doc.createElement('audio');

        this.bindHandler();

        // set `autoplay` property on element
        elem.autoplay = s.autoplay;

        // set `preload` property on element
        if(s.preload){
            elem.preload = 'auto';
        }
        else{
            elem.preload = 'none';
        }

        // set `src` property on element
        if(typeof src === 'string'){
            elem.src = src;
        }
        else if(Object.prototype.toString.call(src) === '[object Object]'){
            for(key in supportAudio){
                if(supportAudio.hasOwnProperty(key) && (key in src)){
                    ele.src = src[key];
                }
            }
        }

        // Invoking `load()` method is required for Safari 4
        if(s.preload){
            elem.load();
        }
    }
    else if(hasFlash){
        insertFlash({
            id: id,
            player: SWF_URL,
            datetime: Math.random()
        });
    }
};

AudioInstance.count = 0;

AudioInstance.prototype = {
    constructor: AudioInstance,
    load: function(src){
        var elem = this.element;
        if(!src){
            src = this.src;
        }

        if(supportAudio){
            elem.load && elem.load();
        }
    },
    play: function(){
        var elem = this.element;
        if(supportAudio){
            if(elem.readyState >= elem.HAVE_FUTURE_DATA){
                elem.play();
            }
        }
    },
    bindHandler: function(){
        this.bindOnload();
    },
    bindOnload: function(){
        var t = this,
            elem = this.element;
        if(supportAudio){
            elem.oncanplaythrough = function(){
                t.onload && t.onload();
            };
        }
    }
};

function insertFlash(){

}
