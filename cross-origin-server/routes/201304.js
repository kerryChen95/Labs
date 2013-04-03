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
};
