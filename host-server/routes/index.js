/*
routes index
*/

var routes201303 = require('./201303.js');

exports.index = function(app){
	// add routes written in 2013/03
	routes201303.index(app);
};
