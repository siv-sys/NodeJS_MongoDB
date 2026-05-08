var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test('works when passed as middleware', function(t) {
  t.plan(3);

  function useMiddleware(mw) {
    // call the middleware with req res, next
    mw({url: '/', method: 'GET'}, 'res', t.pass);
  }

  var router = Router();
  router.all(function(req, res, next) {
    t.equal(req.url, '/');
    t.equal(res, 'res');
    next();
  });
  useMiddleware(router);
});

test('helper runs middleware', function(t) {
  t.plan(3);

  function middleware(req, res, next) {
    t.equal(req.url, '/foo');
    t.equal(res, 'res');
    next();
  }

  var router = Router();
  router.all(middleware);
  router.all(t.pass);

  router(req('/foo'), 'res');
});

test('works nested', function(t) {
  t.plan(2);

  // this is not a namespace test!
  var subRouter = Router();
  // shouldn't be used because it isn't /foo
  subRouter.get('/bar', t.fail);

  subRouter.get('/foo', t.pass);
  subRouter.get('/foo/*', t.pass);

  var router = Router();
  // send /foo or /foo/* to subRouter
  router.all('/foo(/*)', subRouter);

  router(req('/bar'));
  // should be picked up by /foo subRouter
  router(req('/foo'));
  // should be picked up by /foo/* subRouter
  router(req('/foo/fooz'));
});
