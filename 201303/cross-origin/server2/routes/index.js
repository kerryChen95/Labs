var path = require('path');

exports['cross-origin'] = function(app){
	// receive cross-origin request
	app.get('/img', function (req, res) {
		console.log('Receive cross-origin image request, query string is: ', req.query);
	  res.sendfile(path.join(app.get('root path'), 'public/images/kerry95.jpg'));
	});
};
