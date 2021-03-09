import React, { useState, useEffect } from 'react'
import { fetchCurrentUser } from '../apis/auth'

function withAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [authed, setAuthed] = useState(false)
    useEffect(() => {
      const asyncEffect = async () => {
        await fetchCurrentUser()
        setAuthed(true)
      }
      asyncEffect()
    }, [])

    if (!authed) {
      return null
    }
    return <Component {...(props as T)} />
  }
}

export default withAuth
