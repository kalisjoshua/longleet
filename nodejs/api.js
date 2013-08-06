
function endpoint (path, links) {
  return {
      path: path,
      links: links || []
    };
}

module.exports = {
  error: endpoint('/error'),
  mazes: [
    endpoint('', [
      endpoint('/alpha', [
        endpoint('/gamma')
      ]),
      endpoint('/beta')
    ])
  ]
};
