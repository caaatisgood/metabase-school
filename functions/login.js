const fetcher = require('utils').metabaseFetcher

exports.handler = async function (event, context) {
  try {
    const response = await fetcher(`/api/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body,
      __reqHeaders: event.headers,
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
      body: JSON.stringify({ id: data.id }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
