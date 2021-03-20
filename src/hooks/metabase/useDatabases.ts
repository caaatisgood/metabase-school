import useSWR from 'swr'
import { Databases } from '../../types/metabase'
import fetcher from '../../libs/swrFetcher'

const useDatabases = () => {
  const { data } = useSWR(`/.netlify/functions/fetchDatabases/node-fetch`, fetcher)
  const databases: Databases = data || []
  return {
    databases,
  }
}

export default useDatabases
