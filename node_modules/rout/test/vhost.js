var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test('vhost basic', function(t) {
  t.plan(2);
  var router = Router();
  router.all(router.vhost('a.com', t.fail));
  router.all(router.vhost('foo.a.com', t.fail));
  router.all(router.vhost('bar.a.com', t.pass));
  router.all(router.vhost('baz.a.com', t.pass));
  var rek = req('/');
  rek.headers.host = 'bar.a.com';
  router(rek);
  rek.headers.host = 'baz.a.com';
  router(rek);
});

test('vhost is chainable', function(t) {
  t.plan(3);
  var router = Router();
  router.all(router.vhost('foo.a.com', function(req, res, next) {
    t.pass();
    next();
  }));
  router.all(function(req, res, next) {
    t.pass();
    next();
  });
  router.all(router.vhost(':sub.a.com', function(req) {
    t.pass();
  }));
  var rek = req('/');
  rek.headers.host = 'foo.a.com';
  router(rek);
});

test('vhost receives params', function(t) {
  t.plan(1);
  var router = Router();
  router.all(router.vhost(':sub.a.com', function(req, res, next, params) {
    t.equal(params.sub, 'foo');
  }));
  var rek = req('/');
  rek.headers.host = 'foo.a.com';
  router(rek);
});

test('vhost work with data object', function(t) {
  t.plan(2);
  var router = Router();
  router.all(function(req, res, next, params, data) {
    data.foo = true;
    next();
  });
  router.all(router.vhost('foo.a.com', function(req, res, next, params, data) {
    t.true(data.foo);
    next();
  }));
  router.all(function(req, res, next, params, data) {
    t.true(data.foo);
  });
  var rek = req('/');
  rek.headers.host = 'foo.a.com';
  router(rek);
});
