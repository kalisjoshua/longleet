
var SERVER_IP = '127.0.0.1'
  , SERVER_PORT = 1337

  , error = require('./apis/error.js')
  , api = require('./apis/api000.js');

function find (api, url) {
  return url
    .replace(/^\/|\/$/g, '')
    .split('/')
    .reduce(function (tree, part) {
      return tree.links
        .filter(function (link) {
          return link.path.slice(1) === part;
        })[0];
    }, api) || error;
}

function handler (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(JSON.stringify(find(api, req.url)));
}

require('http')
  .createServer(handler)
  .listen(SERVER_PORT, SERVER_IP);

console.log('Server running at http://%s:%s/', SERVER_IP, SERVER_PORT);
