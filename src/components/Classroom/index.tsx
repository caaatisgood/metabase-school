import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import withAuth from '../../hocs/withAuth'
import siteMetadata from '../../constants/siteMetadata'
import useSelf from '../../hooks/useSelf'
import usePeers from '../../hooks/classroom/usePeers'
import getFirebaseRef from '../../libs/getFirebaseRef'
import { fetchDatabases } from '../../apis/query'
import { getClassroomPath, getPeerPath, getQueryPath } from '../../libs/getClassroomFirebasePath'

import Header from '../header'
import QueryPanel from '../QueryPanel'
import Sidebar from './Sidebar'
import { Database } from '../../types/metabase'

const Layout: React.FC = () => {
  const router = useRouter()
  const { username } = useSelf()
  const randomKey = router.query.randomKey as string
  const [peers] = usePeers({ randomKey })
  const [databases, setDatabases] = useState<Database[]>([])
  
  useEffect(() => {
    const asyncFunc = async () => {
      // check if classroom exists, redirect to /hallway
      const classroomRef = getFirebaseRef(getClassroomPath({ randomKey }))
      const classroomValue = (await classroomRef.once('value')).val()
      if (!classroomValue) {
        window.alert(`Oops, classroom does not exist.`)
        router.push('/hallway')
        return
      }
      
      // initiate "user"
      const selfRef = getFirebaseRef(getPeerPath({ randomKey, username }))
      const selfSnap = await selfRef.once('value')
      const selfValue = selfSnap.val()
      if (!selfValue) {
        selfRef.set({
          username,
        })
      }
      // initiate "query"
      const queriesRefPath = getQueryPath({ username, randomKey })
      const queriesRef = getFirebaseRef(queriesRefPath)
      const queriesSnap = await queriesRef.once('value')
      const queriesValue = queriesSnap.val()
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
        <StyledSidebar username={username} users={peers} />
        <main>
          <QueryPanel databases={databases} />
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
