import Router from 'next/router'
import Cookies from '../libs/cookies'
import fetch from '../libs/fetch'
import { SESSION_ID_COOKIE, USERNAME_COOKIE } from '../constants/auth'

type LoginParams = {
  username: string
  password: string
}

export const login = async ({ username, password }: LoginParams) => {
  try {
    const res = await fetch(`/.netlify/functions/login/node-fetch`, {
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
    Cookies.set(SESSION_ID_COOKIE, payload.id)
    Cookies.set(USERNAME_COOKIE, name)
    Router.push('/hallway')
  } catch (err) {
    window.alert(err)
  }
}

export const fetchCurrentUser = async () => {
  try {
    const res = await fetch(`/.netlify/functions/fetchCurrentUser/node-fetch`, {
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
