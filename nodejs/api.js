
var endpoint = require('./endpoint.js');

module.exports = endpoint('', [
  endpoint('/alpha', [
    endpoint('/gamma')
    ]),
  endpoint('/beta')
  ]);
