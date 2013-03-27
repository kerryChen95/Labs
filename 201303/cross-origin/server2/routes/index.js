var path = require('path');

exports['cross-origin'] = function(app){
	// receive cross-origin request
	app.get('/img', function (req, res) {
	  res.sendfile(path.join(app.get('root path'), 'public/images/kerry95.jpg'));
	  // res.send(200, 'data respond to img.src request');
	  // Todo: set response header `Content-Type` to correct data type, to 
	});
};
