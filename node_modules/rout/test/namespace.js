var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test("namespace doesn't modify original router's state", function(t) {
  t.plan(1);
  var router = Router();

  var subRouter = Router();
  subRouter.get('/bar', function() {});

  router.all(router.namespace('/foo', subRouter));

  t.equal(subRouter.routes[0].pattern, '/bar');
});

test('namespace applies to routes without patterns', function(t) {
  t.plan(1);
  var router = Router();

  var subRouter = Router();
  subRouter.all(t.fail);

  var subRouter2 = Router();
  subRouter2.all(t.pass);

  router.all('/foo', subRouter);
  router.all('/bar', subRouter2);

  router(req('/bar'));
});

test('sub router can be used in multiple namespaces', function(t) {
  t.plan(2);
  var router = Router();

  var subRouter = Router();
  subRouter.get('/bar', t.pass);

  router.all(router.namespace('/foo', subRouter));
  router.all(router.namespace('/qux', subRouter));

  router(req('/foo/bar'));
  router(req('/qux/bar'));
});

test('sub router receives params from namespace string', function(t) {
  t.plan(2);
  var router = Router();

  var subRouter = Router();
  subRouter.get('/bar/:barThing', function(req, res, next, params) {
    t.equal(params.thing, 'foo');
    t.equal(params.barThing, 'baz');
  });

  router.all(router.namespace('/:thing', subRouter));

  router(req('/foo/bar/baz'));
});

test('sub router can be used with and without namespace at the same time', function(t) {
  t.plan(2);
  var router = Router();
  var subRouter = Router();
  subRouter.get('/bar', t.pass);
  router.all(router.namespace('/foo', subRouter));
  router.all(subRouter);
  router(req('/foo/bar'));
  router(req('/bar'));
});
