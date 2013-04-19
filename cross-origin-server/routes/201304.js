exports.index = function (app) {
  // jsonp
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

  // CORS
  (function () {
    function allowHeaders (req, res, next) {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next && next();
    }
    function checkOrigin (req, res) {
      var allowedOrigins = ['http://localhost:3000'];
      var origin, allowOrigin;
      var allowedContentTypes = ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'];
      var contentType, allowContentType;

      // whether allow `origin` in request header
      origin = req.header('origin');
      // no such header, no need to allow
      if (!origin) return;

      allowOrigin = allowedOrigins.some(function (allowedOrigin) {
        return origin === allowedOrigin;
      });
      allowOrigin && res.header('Access-Control-Allow-Origin', origin);
    }

    app.all('/cors', allowHeaders);
    app.get('/cors', function (req, res, next) {
      console.log('Request data: ', req.query);
      checkOrigin(req, res);
      res.header('Content-Type', 'application/json');
      res.end( JSON.stringify({
        'I am': 'a response for CORS GET request'
      }) );
    });
    app.post('/cors', function (req, res, next) {
      console.log('Request data: ', req.body);
      checkOrigin(req, res);
      res.header('Content-Type', 'application/json');
      res.end( JSON.stringify({
        'I am': 'a response for CORS POST request with `Content-Type` as `' + req.header('Content-Type') + '`'
      }) );
    });
    app.options('/cors', function (req, res) {
      checkOrigin(req, res);
      res.header('Content-Type', 'application/json');
      res.end();
    });
  })();
};
