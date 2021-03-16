import fetcher from './fetcher'
import { Endpoint, Options } from '../types/fetcher'

const swrFetcher = (endpoint: Endpoint, options: Options) => fetcher(endpoint, options).then(res => res.json())

export default swrFetcher
