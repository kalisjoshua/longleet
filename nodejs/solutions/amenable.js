var api = require('../mazes/amenable'),
    found;

function print(obj) {

  console.log(JSON.stringify(obj, null, 4));
}

function search(location, trail) {

  return location.token ? trail : location.links
    .reduce(function (acc, link) {
      var current;

      current = trail + '/' + link;

      return acc || search(api.visit(current), current);
    }, '');
}

found = search(api.visit(''), '');

if (api.visit(found).token) {
  console.log('Found at: %s', found);
} else {
  print(api.json);
}
