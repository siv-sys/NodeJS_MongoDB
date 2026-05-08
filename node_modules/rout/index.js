var makeRoutingMiddleware = require('./lib/make-routing-middleware');
var makeVhostMiddleware = require('./lib/make-vhost-middleware');
var makeNamespaceMiddleware = require('./lib/make-namespace-middleware');

module.exports = Router;

function Router(parser, routes) {
  var router = makeRoutingMiddleware(parser, routes);
  addHelpers(router);
  router.vhost = makeVhostMiddleware(parser);
  router.namespace = makeNamespaceMiddleware(parser);
  return router;
}

function addHelpers(router) {
  ['get', 'post', 'put', 'patch', 'delete', 'options', 'all'].forEach(function(method) {
    router[method] = function(pattern, handler) {
      var route = {};
      if (method !== 'all') {
        route.method = method;
      }
      // pattern is optional
      if (typeof pattern === 'function') {
        route.handler = pattern;
      } else {
        route.pattern = pattern;
        route.handler = handler;
      };
      router.routes.push(route);
    };
  });
}
