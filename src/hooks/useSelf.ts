import { useState } from 'react'
import Storage from '../libs/storage'
import { USERNAME_STORAGE_KEY } from '../constants/auth'

const useSelf = () => {
  const [username] = useState(Storage.get(USERNAME_STORAGE_KEY))

  return {
    username: username || '',
  }
}

export default useSelf
