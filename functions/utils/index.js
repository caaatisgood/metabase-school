const fetch = require('node-fetch')

module.exports.metabaseFetcher = (path, options) => {
  return fetch(`${process.env.METABASE_API_HOST}${path}`, options)
}
