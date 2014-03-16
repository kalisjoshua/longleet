/**
 * Amenable Maze
 *
 * This maze will have only one token to find and includes no circular paths.
 *
 */
var utils = require('../utils'),
    maze;

function endpoint(path, links) {
  var result;

  result = {
    path: path
  };

  if (links) {
    result.links = links;
  }

  placeToken(result);

  return result;
}

function placeToken(location) {
  var randomPlacement;

  if (!placeToken.placed) {
    // randomly place placeToken
    randomPlacement = 1 === ~~(Math.random() * placeToken.likelyhood--);

    // randomly, or the chances to randomly place the token have run out
    if (randomPlacement || !placeToken.likelyhood) {
      placeToken.placed = location.token = true;
    }
  }
}

function visit(path) {
  var location;

  path = path || '';

  if (utils.isOfType('string', path)) {
    path = utils.parseStringPath(path);
  } else {
    if (!utils.isOfType('array', path)) {
      throw new Error('The path must be either an "array" or "string"; %s provided.', utils.objectType(path));
    }
  }

  location = maze.path === path[0] && path
    .slice(1)
    .reduce(function (current, part) {

      return (current.links || [])
        .filter(function (link) {

          return link.path === part;
        })[0];
    }, maze);

  return !location ? 'not found' : {
    token: location.token,
    path: location.path,
    links: (location.links || [])
      .map(function (link) {

        return link.path;
      })
  };
}

placeToken.likelyhood = 24;

maze = endpoint('', [
  endpoint('alpha', [
    endpoint('gamma', [
      endpoint('delta'),
      endpoint('epsilon')
    ]),
    endpoint('zeta'),
    endpoint('eta', [
      endpoint('theta')
    ])
  ]),
  endpoint('beta', [
    endpoint('iota'),
    endpoint('kappa'),
    endpoint('lambda')
  ]),
  endpoint('mu', [
    endpoint('nu'),
    endpoint('xi', [
      endpoint('omicron', [
        endpoint('pi')
      ])
    ])
  ]),
  endpoint('rho', [
    endpoint('sigma', [
      endpoint('tau')
    ]),
    endpoint('upsilon', [
      endpoint('phi'),
      endpoint('chi')
    ]),
    endpoint('psi')
  ]),
  endpoint('omega')
]);

module.exports = {
  json: maze,
  visit: visit
};
