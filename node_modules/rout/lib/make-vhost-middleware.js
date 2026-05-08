module.exports = function(parser) {
  return function(pattern, handler) {
    return function(req, res, next, params, data) {
      var params = parser(pattern, req.headers.host);
      if (!params) { return next(); }
      handler(req, res, next, params, data);
    };
  };
};
