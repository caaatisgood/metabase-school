const fetch = require('node-fetch')
const cleanApiHost = require('./cleanApiHost')

const SESSION_HEADER = 'x-metabase-session'
const API_HOST_HEADER = 'x-metabase-api-host'

module.exports = (path, options) => {
  const { __reqHeaders, ..._options } = options
  _options.method = _options.method || 'get'
  if (_options.method.toLowerCase() === 'get') {
    _options.headers = {
      ..._options.headers,
      Accept: 'application/json',
      [SESSION_HEADER]: __reqHeaders[SESSION_HEADER],
    }
  }
  const host = cleanApiHost(__reqHeaders[API_HOST_HEADER])
  return fetch(`${host}${path}`, _options)
}
