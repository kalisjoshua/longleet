
module.exports = function endpoint (path, links) {
  return {
      path: path,
      links: links || []
    };
};
