import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useObjectVal } from 'react-firebase-hooks/database';
import styled from 'styled-components'
import withAuth from '../../hocs/withAuth'
import useUser from '../../hooks/useUser'
import siteMetadata from '../../constants/siteMetadata'
import getFirebaseRef from '../../libs/getFirebaseRef'
import { fetchDatabases } from '../../apis/query'
import { getUsersPath, getQueryPath } from '../../libs/getClassroomFirebasePath'

import Header from '../header'
import Board from '../Board'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
  const router = useRouter()
  const { username } = useUser()
  const randomKey = router.query.randomKey as string
  const usersRefPath = getUsersPath({ randomKey })
  const [users] = useObjectVal(getFirebaseRef(usersRefPath))
  const [databases, setDatabases] = useState([])
  
  useEffect(() => {
    const asyncFunc = async () => {
      const usersRef = getFirebaseRef(usersRefPath)
      const usersSnapshot = await usersRef.once('value')
      const usersValue = usersSnapshot.val()
      if (!usersValue) {
        usersRef.set({
          username,
        })
      }
      const queriesRefPath = getQueryPath({ username, randomKey })
      const queriesRef = getFirebaseRef(queriesRefPath)
      const queriesSnapshot = await queriesRef.once('value')
      const queriesValue = queriesSnapshot.val()
      if (!queriesValue) {
        queriesRef.set({
          __placeholder: username,
        })
      }
    }
    asyncFunc()
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
