function encodeFormData (data) {
	var pairs, name, value;
	// ensure `data` contains key/value pairs
	// due to form data is always key/value pairs,
	// but always return a string
	if (Object.prototype.toString.call(data) !== '[object Object]') return '';
	pairs = [];
	for (name in data) {
		value = data[name];
		if (!data.hasOwnProperty(name) || typeof value === 'functoin') continue;
		name = encodeURIComponent(name.replace(' ', '+'));
		value = encodeURIComponent(value.toString().replace(' ', '+'));
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}
