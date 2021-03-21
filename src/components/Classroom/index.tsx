import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import withAuth from '../../hocs/withAuth'
import siteMetadata from '../../constants/siteMetadata'
import useIdentity from '../../hooks/useIdentity'
import useClassroomPeers from '../../hooks/useClassroomPeers'
import useMetabaseApiHost from '../../hooks/useMetabaseApiHost'
import getFirebaseRef from '../../libs/getFirebaseRef'
import {
  getClassroomPath,
  getPeerPath,
  getQueryPath,
} from '../../libs/getClassroomFirebasePath'
import isApiHostPreconfigured from '../../libs/isApiHostPreconfigured'

import Header from '../header'
import QueryPanel from '../QueryPanel'
import Sidebar from './Sidebar'

const Classroom: React.FC = () => {
  const router = useRouter()
  const { username } = useIdentity()
  const randomKey = router.query.randomKey as string
  const peers = useClassroomPeers({ randomKey })
  const { apiHost } = useMetabaseApiHost()

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

      // validate API host
      if (!isApiHostPreconfigured() && classroomValue.apiHost !== apiHost) {
        window.alert(`Incorrect API host.`)
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
          <QueryPanel />
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
  padding-left: 1rem;
  padding-right: 1rem;
  main {
    flex: 1;
    width: calc(100% - 13rem);
  }
`
const StyledSidebar = styled(Sidebar)`
  padding-right: 1rem;
  padding-bottom: 1rem;
  width: 10rem;
`

export default withAuth(Classroom)
