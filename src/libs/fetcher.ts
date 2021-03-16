import Storage from './storage'
import { SESSION_ID_STORAGE_KEY } from '../constants/storage'
import { Endpoint, Options, Headers } from '../types/fetcher'
import getMetabaseApiHost from './getMetabaseApiHost'

const fetcher = (endpoint: Endpoint, options: Options = {}) => {
  const { headers, body, ...restOptions } = options
  const _options: any = {
    ...restOptions,
    headers: _generateHeaders(headers),
  }
  if (body) {
    _options.body = JSON.stringify(body)
  }
  return window.fetch(endpoint, _options)
}

const _generateHeaders = (headers: Headers = {}) => {
  const sessionId = _getMetabaseSessionId() as string
  const _headers: Headers = {
    ...headers,
    'x-metabase-api-host': getMetabaseApiHost() as string,
  }
  if (sessionId) {
    _headers['x-metabase-session'] = sessionId
  }
  return _headers
}

const _getMetabaseSessionId = () => Storage.get(SESSION_ID_STORAGE_KEY)

export default fetcher
