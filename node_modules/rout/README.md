# Rout

Middleware style router with configurable pattern matching/parsing, vhost and namespacing.

![Gaffgarion](https://raw.githubusercontent.com/m59peacemaker/node-rout/master/ff-tactics-rout.png "Gaffgarion")

## Install
```
npm install rout
```

## Y!?

Why did I add to npm's 2526 packages that match the search "router"?

- Mostly because every other router I know of has a built-in parser. That bothers me.
- A lot of routers don't make their state (routes) available to the outside world. Does it matter? Better safe than sorry. Internal state is bad enough anyway.

## Usage

```javascript
// setup the router with a parser
var UrlPattern = require('url-pattern');
var parser = function(pattern, url) {
  return new UrlPattern(pattern).match(url);
}
var Router = require('rout').bind(null, parser);

// create a router instance
var router = new Router();

// add a route (there are other ways to do this)
router.get('/foo', function(req, res) {
  res.end('foo');
});

// use as middleware
http.createServer(router);
```

### Router(parser, routes, patternModifier)

#### parser(pattern, url)

Function that matches `url` to `pattern` and parses parameters from `url`.

- if the url matches the pattern:
  - if there are parameters, return an object of parameters
  - if there are no parameters, return an empty object
- if the url does not match the pattern:
  - return false

[url-pattern](https://www.npmjs.com/package/url-pattern) is a great parser for routers.

#### routes

Pass in an array of routes to set initial state.

#### patternModifier(pattern)

This function modifies the pattern that will be passed to the parser. The return value is the pattern that will be used by the parser.

## Manual route creation

A route can be a handler function or an object with the properties `method`, `pattern` and `handler`.

```javascript
var routes = [
  // handler for all requests
  function(req, res, next) {
    console.log(req.url);
    next();
  },
  // basic route
  {
    method: 'get',
    pattern: '/foo/:id',
    handler: function(req, res, next, params) { res.end('foo: '+params.id); }
  },
];
```

#### method

The http method of the request. Not case-sensitive.

If not present or falsy, the route will match all methods.

#### pattern

The pattern to test the request url against.

If not present or falsy, the route will match all urls.

#### handler(req, res, next, params, data)

- req    - request object
- res    - response object
- next   - callback to continue to the next matching route, optionally passing data to that route handler
- params - url parameters
- data   - a data object that persists across handlers for a request

## Helpers / route generation

#### router\[method](pattern, handler), router\[method](handler)

Methods: get, post, put, patch, delete, options, all

```javascript
// add route that handles all methods and all urls (all requests)
router.all(function(req, res, next) {
  next();
});
// add route that handles all get requests
router.get(function(req, res) {
  res.end();
});
// add route that handles post requets to /foo
router.post('/foo', function(req, res) {
  res.end();
});
```

## router.routes

Routes are stored on `router.routes` so that they can be easily accessed and manipulated.

## Middleware

```javascript
router.all(favicon(__dirname+'/public/favicon.ico'));
```

## router.vhost(pattern, handler)

Uses the configured parser to match the host to the pattern.

If the request host matches the pattern, the handler will be called.

```javascript
// direct anything with a "foo" subdomain to fooRouter
router.all(router.vhost('(http(s)\\://)foo.:domain(.:tld)(\\::port)', fooRouter));
```

## router.namespace(pattern, router)

Returns a router with the same parser and state as `router`, but all route patterns are parsed with `pattern` prefixed.

```javascript
var router = new Router();

var subRouter = new Router();
subRouter.get('/bar', function() {});

// /foo/bar will be handled by the subRouter's /bar
router.all(router.namespace('/foo', subRouter));
```
