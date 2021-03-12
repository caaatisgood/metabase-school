import { useState } from 'react'
import Cookies from '../libs/cookies'
import { USERNAME_COOKIE } from '../constants/auth'

const useUser = () => {
  const [username] = useState(Cookies.get(USERNAME_COOKIE))

  return {
    username: username || '',
  }
}

export default useUser
