exports.get = (host, path, params) => {
  var esc = encodeURIComponent;
  var query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  return fetch(host + '/' + path + '?' + query);
}