
function api_search (api, url) {
  return url
    .replace(/^\/|\/$/g, '')
    .split('/')
    .reduce(api_search_reduce, api);
}

function api_search_filter (part, link) {
  return link.path
    .slice(1) === part;
}

function api_search_reduce (tree, part) {
  return tree.links
    .filter(api_search_filter.bind(null, part))[0];
}

module.exports = api_search;