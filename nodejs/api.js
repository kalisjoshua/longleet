
var chobani;

function endpoint(path, links) {

  return {
      path: path,
      links: links || [],
      token: /error/i.test(path) ? false : token(path)
    };
}

function solution(api, path) {
  if (api.token) {
    return path;
  } else {

    return api.links
      .reduce(function (acc, link) {
        return acc + solution(link, path + link.path);
      }, '');
  }
}

function token(path) {
  var result;

  if (!token.placed) {
    result = ~~(Math.random() * token.ratio--);

    if (1 === result || !token.ratio) {
      token.path = path;
      token.placed = true;
      return true;
    }
  }

  return false;
}

token.ratio = 24;

chobani = endpoint('', [
  endpoint('/alpha', [
    endpoint('/gamma', [
      endpoint('/delta'),
      endpoint('/epsilon')
    ]),
    endpoint('/zeta'),
    endpoint('/eta', [
      endpoint('/theta')
    ])
  ]),
  endpoint('/beta', [
    endpoint('/iota'),
    endpoint('/kappa'),
    endpoint('/lambda')
  ]),
  endpoint('/mu', [
    endpoint('/nu'),
    endpoint('/xi', [
      endpoint('/omicron', [
        endpoint('/pi')
      ])
    ])
  ]),
  endpoint('/rho', [
    endpoint('/sigma', [
      endpoint('/tau')
    ]),
    endpoint('/upsilon', [
      endpoint('/phi'),
      endpoint('/chi')
    ]),
    endpoint('/psi')
  ]),
  endpoint('/omega')
]);

module.exports = {
  error: endpoint('/error'),
  mazes: [
    chobani
  ],
  solutions: [
    solution(chobani, '')
  ]
};
