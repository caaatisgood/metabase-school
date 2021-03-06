import Router from 'next/router'
import Storage from '../utils/storage'
import fetcher from '../utils/fetcher'
import { SESSION_ID_STORAGE_KEY, USERNAME_STORAGE_KEY } from '../constants/storage'
import { signIn } from '../utils/firebase/auth'

type LoginParams = {
  username: string
  password: string
}

export const login = async ({ username, password }: LoginParams) => {
  try {
    const res = await fetcher(`/.netlify/functions/login/node-fetch`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
    const payload = await res.json()
    if (!res.ok) {
      window.alert(JSON.stringify(payload.errors) || payload.statusText)
      return
    }
    const [rawName] = username.split('@')
    const name = rawName.replace(/\./g, '-')
    Storage.set(SESSION_ID_STORAGE_KEY, payload.id)
    Storage.set(USERNAME_STORAGE_KEY, name)
    await signIn(payload.fbToken)
    Router.push('/hallway')
  } catch (err) {
    window.alert(err)
  }
}

export const fetchCurrentUser = async () => {
  try {
    const res = await fetcher(`/.netlify/functions/fetchCurrentUser/node-fetch`, {
      method: 'GET',
    })
    if (!res.ok) {
      Router.push('/')
      return
    }
  } catch (err) {
    console.error(err)
    window.alert(err)
  }
}
