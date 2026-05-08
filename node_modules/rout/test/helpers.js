var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test('helper adds route', function(t) {
  t.plan(1);
  var router = Router();
  router.get(function() {});
  t.true(router.routes.length === 1);
});

test('helper adds basic route w/ pattern', function(t) {
  t.plan(3);
  var router = Router();

  router.get('/foo', function() {});

  var route = router.routes[0];
  t.equal(route.method, 'get');
  t.equal(route.pattern, '/foo');
  t.true(typeof route.handler === 'function');
});

test('helper adds basic route w/o pattern', function(t) {
  t.plan(3);
  var router = Router();

  router.get(function() {});

  var route = router.routes[0];
  t.false(route.hasOwnProperty(route.method));
  t.false(route.hasOwnProperty(route.pattern));
  t.true(typeof route.handler === 'function');
});

test('helper adds all method route w/ pattern', function(t) {
  t.plan(3);
  var router = Router();

  router.all('/foo', function() {});

  var route = router.routes[0];
  t.false(route.hasOwnProperty(route.method));
  t.equal(route.pattern, '/foo');
  t.true(typeof route.handler === 'function');
});

test('helper adds all method route w/o pattern', function(t) {
  t.plan(3);
  var router = Router();

  router.all(function() {});

  var route = router.routes[0];
  t.false(route.hasOwnProperty(route.method));
  t.false(route.hasOwnProperty(route.method));
  t.true(typeof route.handler === 'function');
});
