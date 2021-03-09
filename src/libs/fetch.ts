import Cookies from './cookies'
import { SESSION_ID_COOKIE } from '../constants/auth'

type Headers = {
  [key: string]: string
}
type Options = {
  headers?: Headers
  body?: Object
  method?: string
  [key: string]: any
}

const fetch = (endpoint: string, options: Options) => {
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
  const sessionId = _getMetabaseSessionId()
  const _headers = headers
  if (sessionId) {
    _headers['x-metabase-session'] = sessionId
  }
  return _headers
}

const _getMetabaseSessionId = () => Cookies.get(SESSION_ID_COOKIE)

export default fetch
