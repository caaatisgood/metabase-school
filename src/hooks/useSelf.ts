import { useState } from 'react'
import Cookies from '../libs/cookies'
import { USERNAME_COOKIE } from '../constants/auth'

const useSelf = () => {
  const [username] = useState(Cookies.get(USERNAME_COOKIE))

  return {
    uesername: username || '',
  }
}

export default useSelf
