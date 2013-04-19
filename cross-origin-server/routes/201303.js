var path = require('path');

exports.index = function (app) {
  // receive cross-origin request
  app.get('/xhr', function (req, res) {
    console.log('Receive cross-origin XHR request, query string: ', req.query);
    res.send(200, 'Received cross-origin XHR request');
  });
  app.get('/img', function (req, res) {
    console.log('Receive cross-origin image request, query string is: ', req.query);
    res.sendfile(path.join(app.get('root path'), 'public/img/kerry95.jpg'));
  });
}
