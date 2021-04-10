import fetcher from './fetcher'
import { Endpoint, Options } from '../types/fetcher'

class ResponseError extends Error {
  data: object | undefined

  constructor(...params: any) {
    super(...params)
    this.data = undefined
  }
}

const swrFetcher = async (endpoint: Endpoint, options: Options) => {
  const res = await fetcher(endpoint, options)
  const body = await res.json()
  if (!res.ok) {
    const error = new ResponseError(res.statusText)
    error.data = body
    throw error
  }
  return body
}

export default swrFetcher
