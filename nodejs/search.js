
function apiSearch(api, url) {

  return url
    .replace(/^\/|\/$/g, '')
    .split('/')
    .reduce(apiSearchReduce, api);
}

function apiSearchFilter(part, link) {

  return link.path
    .slice(1) === part;
}

function apiSearchReduce(tree, part) {

  return tree.links
    .filter(apiSearchFilter.bind(null, part))[0];
}

module.exports = apiSearch;
