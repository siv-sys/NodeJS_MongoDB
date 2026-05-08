var eachSeries = require('each-series');

module.exports = function(parser, routes, patternModifier) {

  patternModifier = patternModifier || function(pattern) { return pattern; };

  function router(req, res, nextMiddleware) {

    var data = {};

    eachSeries(router.routes, function(route, idx, next) {

      // if route is a function, use it as handler
      if (typeof route === 'function') {
        return route(req, res, next, null, data);
      }

      // check method
      if (!methodMatches(req.method, route.method)) {
        return next();
      }

      // check/parse url/params
      if (route.pattern) {
        var params = parser(patternModifier(route.pattern), req.url);
        if (!params) {
          return next();
        }
      }

      route.handler(req, res, next, params, data);
    }, nextMiddleware);
  };
  router.routes = routes || [];
  return router;
};

function methodMatches(a, b) {
  if (b === undefined) { return true; }
  a = a.toUpperCase();
  b = b.toUpperCase();
  if (a === b) { return true; }
  return false;
}
