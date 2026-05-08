module.exports = function(url, method) {
  return {
    headers: {host: ''},
    url: url,
    method: method || 'GET'
  };
};
