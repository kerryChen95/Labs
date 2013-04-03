var routes201303 = require('./201303.js'),
	routes201304 = require('./201304.js');

exports.index = function(app){
	// add routes written in 2013/03
	routes201303.index(app);
	// add routes written in 2013/04
	routes201304.index(app);
};
