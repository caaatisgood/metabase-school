import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import withAuth from '../../hocs/withAuth'
import siteMetadata from '../../constants/siteMetadata'
import getFirebaseRef from '../../libs/getFirebaseRef'
import Cookies from '../../libs/cookies'
import { USERNAME_COOKIE } from '../../constants/auth'
import { fetchDatabases } from '../../apis/query'

import Header from '../header'
import Board from '../Board'
import Sidebar from './Sidebar'

const FIREBASE_USERS_REF = `rooms/200619/users`
const FIREBASE_BOARDS_REF = `rooms/200619/boards`

const Layout: React.FC = () => {
  const [users, setUsers] = useState({})
  const [username, setUsername] = useState<string | undefined>()
  const [databases, setDatabases] = useState([])

  useEffect(() => {
    const asyncEffect = async () => {
      const username = Cookies.get(USERNAME_COOKIE)
      setUsername(username)
      const userRefPath = `${FIREBASE_USERS_REF}/${username}`
      const userRef = getFirebaseRef(userRefPath)
      const userSnapshot = await userRef.once('value')
      const userValue = userSnapshot.val()
      if (!userValue) {
        userRef.set({
          username,
        })
      }
      const boardRefPath = `${FIREBASE_BOARDS_REF}/${username}`
      const boardRef = getFirebaseRef(boardRefPath)
      const boardSnapshot = await boardRef.once('value')
      const boardValue = boardSnapshot.val()
      if (!boardValue) {
        boardRef.set({
          __placeholder: username,
        })
      }
    }
    asyncEffect()
  }, [])

  useEffect(() => {
    const ref = getFirebaseRef(FIREBASE_USERS_REF)
    ref.on('value', (snapshot) => {
      const value = snapshot.val()
      setUsers(value)
    })
  }, [])

  useEffect(() => {
    const asyncEffect = async () => {
      const _databases = await fetchDatabases()
      setDatabases(
        _databases.map(({ name, id }) => ({
          name,
          id,
        })),
      )
    }
    asyncEffect()
  }, [])

  return (
    <StyledWrapper>
      <Head>
        <script
          src='https://cdn.jsdelivr.net/npm/firepad@1.5.10/dist/firepad.min.js'
          type='text/javascript'
        />
        <meta name='robots' content='noindex' />
      </Head>
      <Header siteTitle={siteMetadata.title} />
      <StyledInner>
        <StyledSidebar username={username} users={users} />
        <main>
          <Board username={username} databases={databases} />
        </main>
      </StyledInner>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  background: #ebebeb;
`
const StyledInner = styled.div`
  display: flex;
  main {
    flex: 1;
    max-width: calc(100vw - 200px);
  }
`
const StyledSidebar = styled(Sidebar)`
  flex-basis: 200px;
  flex-shrink: 0;
`

export default withAuth(Layout)
