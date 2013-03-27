/*
Make varieties of cross-origin requests 
to see whether target server could receive request 
and whether sender could receive response from that cross-origin server.
*/

document.body.onload = function () {
	console.log('document loaded');
	var target = 'http://localhost:3001/';

	function _append (content, style) {
		var p = document.createElement('p'),
			prop;
		p.innerHTML = content;
		for (prop in style) {
			if (style.hasOwnProperty(prop)) {
				p.style[prop] = style[prop];
			}
		}
		document.body.appendChild(p);
	}

	// Cross-origin by XMLHttpRequest without `Access-Control-Allow-Origin`:
	// 目标服务器能接收到请求，
	// 但HTTP响应报文会被浏览器屏蔽，无法在浏览器端通过JS获取，
	// 并且抛出一个无法在与xhr有关的代码块中捕获的error。
	(function () {
		var xhr;

		var append = function () {
			arguments[0] = 'Example: cross-origin by XHR<hr/>' + arguments[0];
			return _append.apply( null, arguments );
		}

		try {
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				append('xhr.readyState = ' + xhr.readyState);

				if (xhr.readyState === xhr.DONE) {
					append('HTTP status code: ' + xhr.status);
					if (xhr.status >= 200 && xhr.status <= 299) {
						append('And get a success status code ' + xhr.status);
						append('response text: ' + xhr.responseText);
					} else {
						// we make target server respond status code 200,
						// so if received full response but status code is not 200,
						// we think that XHR has stoped due to an error
						append('XHR is stopped by an error: if XHR load resource from an origin that is not allowed by `Access-Control-Allow-Origin`, it will be canceled by browser once it receive response headers from a cross-origin server (tested in Chrome 25), in other words, `xhr.readyState` can change to `xhr.DONE` as normal, but it retrieves no response data, and HTTP status code is also set to 0', {color: 'red'});
					}
				}
			};
			xhr.open('GET', target + 'xhr?name=value');
			xhr.send();
		} catch (e) {
			console.log('Can not catch this error: ', e);
		}
	})();

	// Cross-origin by `img` tag:
	// 目标服务器能接受到请求，但返回的非图片数据会被浏览器屏蔽，
	// 无法在JS中获取，
	// 只能用返回图像的宽高来表示少量信息。
	// 注意通过 `naturalWidth` 属性来获取图像的原始宽高，
	// `width` 属性会受CSS影响。
	(function () {
		var img = document.createElement('img'),
			body = document.body;

		var append = function () {
			arguments[0] = 'Example: cross-origin by `img.src`<hr/>' + arguments[0];
			return _append.apply( null, arguments );
		}

		img.style.display = 'none';
		body.appendChild(img);
		img.src = target + 'img?name=value';
		append('An cross-origin GET request is sent by `img.src`');

		img.onload = function () {
			append('Image\'s width is ' + img.naturalWidth + 'px, and height is ' + img.naturalHeight + 'px.');
		}
	})();
};
