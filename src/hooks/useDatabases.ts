import useSWR from 'swr'
import { Databases } from '../types/metabase'
import { Endpoint, Options } from '../types/fetcher'
import fetcher from '../libs/fetcher'

const _fetcher = (endpoint: Endpoint, options: Options) => fetcher(endpoint, options).then(res => res.json())

const useDatabases = () => {
  const { data } = useSWR(`/.netlify/functions/fetchDatabases/node-fetch`, _fetcher)
  const databases: Databases = data || []
  return {
    databases
  }
}

export default useDatabases
