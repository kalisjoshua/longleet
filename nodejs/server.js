/*jshint laxcomma:true*/

var SERVER_IP = '127.0.0.1'
  , SERVER_PORT = 1337

  , api = require('./api.js')
  , error = require('./error.js')

  , json = {'Content-Type': 'application/json'}
  , text = {'Content-Type': 'text/plain'};

function filter_part (part, link) {
  return link.path
    .slice(1) === part;
}

function reduce_part (tree, part) {
  return tree.links
    .filter(filter_part.bind(null, part))[0];
}

function request_handler (req, res) {
  if (!/get/i.test(req.method)) {
    res.writeHead(403, text);
    res.end('Method [' + req.method + '] not allowed.');
  }

  var found = search(api, req.url)
    , status = 200;

  if (!found) {
    status = 404;
    found = error;
  }

  res.writeHead(status, json);
  res.end(JSON.stringify(found));
}

function search (api, url) {
  return url
    .replace(/^\/|\/$/g, '')
    .split('/')
    .reduce(reduce_part, api);
}

require('http')
  .createServer(request_handler)
  .listen(SERVER_PORT, SERVER_IP);

console.log('Server running at http://%s:%s/', SERVER_IP, SERVER_PORT);
