import Storage from './storage'
import config from '../config'
import { API_HOST_STORAGE_KEY } from '../constants/storage'

const getMetabaseApiHost = () => {
  return Storage.get(API_HOST_STORAGE_KEY) || config.metabaseApiHost
}

export default getMetabaseApiHost
