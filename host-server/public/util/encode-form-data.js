// Encode XHR data that is used as form data
// with HTTP header `Content-Type` as `application/x-www-form-urlencoded`,
// or as `multipart/form-data; boundary=<boundary>` if `boundary` is provided

function encodeFormData (data, boundary) {
  var parts, name, value;
  // **NOTE**:
  // use the decoding of `%0D%0A` to break line in HTTP message body
  var lineBreaker = decodeURIComponent('%0D%0A');
  // ensure `data` contains key/value pairs
  // due to form data is always key/value pairs,
  // but always return a string
  if (Object.prototype.toString.call(data) !== '[object Object]') return '';

  parts = [];

  // Encode according to http://www.w3.org/TR/html401/interact/forms.html#didx-applicationx-www-form-urlencoded,
  // but space charactor is not replaced by '+'
  if (!boundary) {
    for (name in data) {
      value = data[name];
      if (!data.hasOwnProperty(name) || typeof value === 'functoin') continue;
      name = encodeURIComponent(name);
      // name = encodeURIComponent(name.replace(/\s{1}/g, '+'));
      value = encodeURIComponent(value.toString());
      // value = encodeURIComponent(value.toString().replace(/\s{1}/g, '+'));
      parts.push(name + '=' + value);
    }
    return parts.join('&');
  }
  // Encode according to http://www.w3.org/TR/html401/interact/forms.html#didx-applicationx-www-form-urlencoded#didx-multipartform-data,
  // but not support file currently
  else {
    boundary = '--' + boundary + lineBreaker;

    for (name in data) {
      value = data[name];
      if (!data.hasOwnProperty(name) || typeof value === 'function') continue;
      value = value.toString();
      parts.push('Content-Disposition: form-data; name="' + name + '"' + lineBreaker + lineBreaker + value + lineBreaker);
    }

    if (parts.length === 0) {
      return '';
    }
    else {
      parts = parts.join(boundary);
      parts = boundary + parts;
      parts += boundary.slice(0, lineBreaker.length * -1) + '--';
      return parts;
    }
  }
}
