var makeRoutingMiddleware = require('./make-routing-middleware');

module.exports = function(parser) {
  return function(prefix, router) {
    return makeRoutingMiddleware(parser, router.routes, function(pattern) {
      return prefix+pattern;
    });
  };
};
