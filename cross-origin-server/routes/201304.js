exports.index = function (app) {
	app.get('/jsonp', function (req, res) {
		var callback = req.query['jsonp'],
			response = {
				'jsonp': 'awesome!'
			};

		console.log(callback);

		response = JSON.stringify(response);
		// notice JSON's MIME type
		res.set('Content-Type', 'application/json');
		res.send(200, callback + '(' + response + ')');
	});

	// JSONM
	app.get('/jsonm', function (req, res) {
		var callback = req.query['callback'],
			response = {
				'jsonm': 'awesome!'
			};

		console.log('JSONM callback function name: ', callback);

		response = JSON.stringify(response);
		res.set('Content-Type', 'application/json');
		res.send(200, callback + '(' + response + ')');
	});
};
