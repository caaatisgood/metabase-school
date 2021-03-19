import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import useCurrentUser from '../hooks/metabase/useCurrentUser'

function withAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [authed, setAuthed] = useState(false)
    const { data, error } = useCurrentUser()
    const router = useRouter()

    useEffect(() => {
      if (data) {
        setAuthed(true)
      }
      if (error) {
        router.push('/')
      }
    }, [data, error])

    if (!authed) {
      return null
    }
    return <Component {...(props as T)} />
  }
}

export default withAuth
