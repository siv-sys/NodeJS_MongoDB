var UrlPattern = require('url-pattern');

module.exports = require('../../').bind(null, function(pattern, url) {
  return new UrlPattern(pattern).match(url);
});
