
function isOfType(type, obj) {

  return objectType(obj).toLowerCase() === type.toLowerCase();
}

function objectType(obj) {

  return {}.toString.call(obj)
    .match(/\s([^\]]+)/)[1];
}

function parseStringPath(path) {
  path = path
    .replace(/^\s+|\s+$/g, '');

  // split on the space just before the slashes and the previous character
  path = path === '/' ? [''] : path
    // remove trailing slash
    .replace(/(.+)\/$/, '$1')
    .split('/');

  return path;
}

module.exports = {
  isOfType: isOfType,
  objectType: objectType,
  parseStringPath: parseStringPath
};
