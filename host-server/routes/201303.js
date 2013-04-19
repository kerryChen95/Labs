var path = require('path');

var root;

exports.index = function (app) {
  root = app.get('root path');

  // cross-origin examples
  app.get('/cross-origin', function (req, res) {
    res.sendfile(path.join(root, 'views/201303/cross-origin.html'));
  });
}
