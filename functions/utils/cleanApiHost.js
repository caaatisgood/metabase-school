module.exports = (raw) => {
  let apiHost = raw
  if (apiHost.endsWith('/')) {
    apiHost = apiHost.substring(0, apiHost.length - 1)
  }
  return apiHost
}
