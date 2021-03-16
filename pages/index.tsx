import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import LoginForm from '../src/components/LoginForm'
import useIdentity from '../src/hooks/useIdentity'
import useCurrentUser from '../src/hooks/metabase/useCurrentUser'

const IndexPage = () => {
  const { apiEndpoint, sessionId } = useIdentity()
  const { data: currentUser, error: currentUserError } = useCurrentUser(!!(apiEndpoint && sessionId))
  const router = useRouter()
  
  /* identity check
   *
   * if api host and session id are provided:
   *   validate session id
   *   if valid
   *     redirect to /hallway
   * prompt login
   * 
   */
  useEffect(() => {
    if (currentUser && !currentUserError) {
      router.push('/hallway')
    }
  }, [currentUser, currentUserError])

  return (
    <>
      <SEO />
      <Theme>
        <EntiresLayout>
          <StyledInnerWrapper>
            <LoginForm />
          </StyledInnerWrapper>
        </EntiresLayout>
      </Theme>
    </>
  )
}

const StyledInnerWrapper = styled.div`
  padding-bottom: 1rem;
  h1 {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`

export default IndexPage
