import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import withAuth from '../src/hocs/withAuth'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import CreateClassroom from '../src/components/CreateClassroom'
import JoinClassroom from '../src/components/JoinClassroom'
import useIdentity from '../src/hooks/useIdentity'
import useCurrentUser from '../src/hooks/metabase/useCurrentUser'
import useMetabaseApiHost from '../src/hooks/useMetabaseApiHost'

const Hallway = () => {
  const { apiHost } = useMetabaseApiHost()
  const { sessionId } = useIdentity()
  const { data: currentUser, error: currentUserError } = useCurrentUser(
    !!(apiHost && sessionId),
  )
  const router = useRouter()

  /* identity check
   *
   * if api host and session id are provided:
   *   validate session id
   *   if valid
   *     stay
   * redirect to homepage
   */
  useEffect(() => {
    if (!apiHost || !currentUser || currentUserError) {
      router.push('/')
    }
  }, [apiHost, currentUser, currentUserError])

  return (
    <>
      <SEO title='Hallway' />
      <Theme>
        <EntiresLayout title='Hallway'>
          <JoinClassroom />
          <StyledDivider>or</StyledDivider>
          <CreateClassroom />
        </EntiresLayout>
      </Theme>
    </>
  )
}

const StyledDivider = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export default withAuth(Hallway)
