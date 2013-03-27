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
