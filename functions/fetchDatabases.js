const fetcher = require('utils').metabaseFetcher

exports.handler = async function (event, context) {
  const SESSION_HEADER = 'x-metabase-session'
  try {
    const response = await fetcher('/api/database', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        [SESSION_HEADER]: event.headers[SESSION_HEADER],
      },
    })
    if (!response.ok) {
      try {
        const data = await response.json()
        return {
          statusCode: response.status,
          body: JSON.stringify({
            statusText: response.statusText,
            errors: data.errors,
          }),
        }
      } catch (err) {
        return {
          statusCode: response.status,
          body: JSON.stringify({
            statusText: response.statusText,
          }),
        }
      }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
