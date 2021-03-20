const fetcher = require('utils').metabaseFetcher

exports.handler = async function (event, context) {
  const SESSION_HEADER = 'x-metabase-session'
  try {
    const response = await fetcher(`/api/dataset`, {
      method: 'POST',
      __reqHeaders: event.headers,
      headers: {
        'Content-Type': 'application/json',
        [SESSION_HEADER]: event.headers[SESSION_HEADER],
      },
      body: event.body,
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      const data = await response.json()
      return {
        statusCode: response.status,
        body: JSON.stringify({
          statusText: response.statusText,
          errors: data.errors,
        }),
      }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
