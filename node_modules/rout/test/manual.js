var test = require('tape');
var Router = require('./common/Router');
var req = require('./common/req');

test('normal route', function(t) {
  t.plan(1);
  var pattern = '/foo/baz';
  var routes = [
    {
      pattern: pattern,
      method: 'get',
      handler: function(req) {
        t.pass();
      }
    }
  ];
  Router(routes)(req(pattern));
});

test('all method route', function(t) {
  t.plan(2);
  var pattern = '/foo';
  var routes = [
    {
      pattern: pattern,
      handler: function(req) {
        t.pass();
      }
    }
  ];
  var router = Router(routes)
  router(req(pattern, 'post'));
  router(req(pattern, 'delete'));
});

test('all pattern route', function(t) {
  t.plan(2);
  var routes = [
    {
      method: 'get',
      handler: function(req) {
        t.pass();
      }
    }
  ];
  var router = Router(routes);
  router(req('/foo'));
  router(req('/foo/baz'));
});


test('series of matches', function(t) {
  t.plan(3);
  var routes = [
    {
      handler: function(req, res, next) {
        t.pass();
        next();
      }
    },
    {
      pattern: '/foo/*',
      handler: function(req, res, next) {
        t.pass();
        next();
      }
    },
    {
      pattern: '/ignore',
      handler: function(req) {
        t.fail();
      }
    },
    {
      pattern: '/foo/:thing',
      handler: function(req) {
        t.pass();
      }
    },
  ];
  Router(routes)(req('/foo/bar'));
});

test('handler receives params', function(t) {
  t.plan(1);
  var routes = [
    {
      pattern: '/:foo',
      handler: function(req, res, next, params) {
        t.equal(params.foo, 'fooz');
      }
    },
  ];
  Router(routes)(req('/fooz'));
});

test('properly accepts state', function(t) {
  t.plan(1);
  var router = Router();
  function noop() {}
  router.get('/foo', noop);
  router.options('/bar', noop);
  router.all('*', noop);
  t.deepEqual(router.routes, [
    {
      method: 'get',
      pattern: '/foo',
      handler: noop
    },
    {
      method: 'options',
      pattern: '/bar',
      handler: noop
    },
    {
      pattern: '*',
      handler: noop
    }
  ]);
});

test('persists data across handlers', function(t) {
  t.plan(1);
  var routes = [
    {
      handler: function(req, res, next, params, data) {
        data.foo = true;
        next();
      }
    },
    {
      handler: function(req, res, next, params, data) {
        t.true(data.foo);
      }
    }
  ];
  Router(routes)(req('/'));
});

test('handler function can be used as route', function(t) {
  t.plan(1);
  var routes = [
    function(req, res) {
      t.pass();
    }
  ];
  Router(routes)(req('/'));
});

test('data does not persist across requests', function(t) {
  t.plan(4);
  var routes = [
    function(req, res, next, params, data) {
      t.false(data.foo);
      data.foo = true;
      next();
    },
    function(req, res, next, params, data) {
      t.true(data.foo);
    }
  ];
  var router = Router(routes);
  router(req('/'));
  router(req('/'));
});
