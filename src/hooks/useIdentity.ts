import { useCallback, useState } from 'react'
import firebase from '../libs/firebase/init'
import { useRouter } from 'next/router'
import Storage from '../libs/storage'
import { USERNAME_STORAGE_KEY, SESSION_ID_STORAGE_KEY } from '../constants/storage'

type Identity = {
  username?: string | null
  sessionId?: string | null
}

const useIdentity = () => {
  const [state] = useState<Identity>({
    username: Storage.get(USERNAME_STORAGE_KEY),
    sessionId: Storage.get(SESSION_ID_STORAGE_KEY),
  })
  const router = useRouter()

  const logout = useCallback(async () => {
    if (window.confirm('Please confirm to logout')) {
      Storage.remove(USERNAME_STORAGE_KEY)
      Storage.remove(SESSION_ID_STORAGE_KEY)
      await firebase.auth().signOut()
      router.push('/')
    }
  }, [])

  return {
    username: state.username || '',
    sessionId: state.sessionId,
    logout,
  }
}

export default useIdentity
