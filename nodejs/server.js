var SERVER_IP = '127.0.0.1',
    SERVER_PORT = 1337,

    api = require('./api.js'),
    search = require('./search.js'),

    json = {'Content-Type': 'application/json'},
    text = {'Content-Type': 'text/plain'};

function handler(req, res) {
  if (!/get/i.test(req.method)) {
    res.writeHead(403, text);
    res.end('Method [' + req.method + '] not allowed.');
  }

  var found = search(api.mazes[0], req.url),
      status = 200;

  if (!found) {
    status = 404;
    found = api.error;
  }

  res.writeHead(status, json);
  res.end(JSON.stringify(found));
}

require('http')
  .createServer(handler)
  .listen(SERVER_PORT, SERVER_IP);

console.log('Server running at http://%s:%s/', SERVER_IP, SERVER_PORT);
