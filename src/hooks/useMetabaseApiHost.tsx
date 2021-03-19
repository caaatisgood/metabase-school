import { useState } from 'react'
import Storage from '../libs/storage'
import { API_HOST_STORAGE_KEY } from '../constants/storage'
import getMetabaseApiHost from '../libs/getMetabaseApiHost'

const useMetabaseApiHost = () => {
  const [, rerender] = useState<any>(null)

  const setApiHost = (apiHost: string) => {
    Storage.set(API_HOST_STORAGE_KEY, apiHost)
    rerender({})
  }

  return {
    apiHost: getMetabaseApiHost(),
    setApiHost,
  }
}

export default useMetabaseApiHost
