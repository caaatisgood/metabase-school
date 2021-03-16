import { useState } from 'react'
import Storage from '../libs/storage'
import { USERNAME_STORAGE_KEY, SESSION_ID_STORAGE_KEY } from '../constants/storage'
import getMetabaseApiHost from '../libs/getMetabaseApiHost'

type Identity = {
  username?: string | null,
  apiEndpoint?: string | null,
  sessionId?: string | null,
}

const useIdentity = () => {
  const [state] = useState<Identity>({
    username: Storage.get(USERNAME_STORAGE_KEY),
    apiEndpoint: getMetabaseApiHost(),
    sessionId: Storage.get(SESSION_ID_STORAGE_KEY),
  })

  return {
    username: state.username || '',
    apiEndpoint: state.apiEndpoint,
    sessionId: state.sessionId,
  }
}

export default useIdentity
