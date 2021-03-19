import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import LoginForm from '../src/components/LoginForm'
import useIdentity from '../src/hooks/useIdentity'
import useCurrentUser from '../src/hooks/metabase/useCurrentUser'
import Input from '../src/components/Input'
import config from '../src/config'
import getMetabaseApiHost from '../src/libs/getMetabaseApiHost'
import useMetabaseApiHost from '../src/hooks/useMetabaseApiHost'

const IndexPage = () => {
  const router = useRouter()
  const { apiHost, setApiHost } = useMetabaseApiHost()
  const { apiEndpoint, sessionId } = useIdentity()
  const { data: currentUser, error: currentUserError } = useCurrentUser(!!(apiEndpoint && sessionId))
  console.log('apiHost', apiHost)

  const _onChangeMetabaseHost = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setApiHost(evt.target.value)
  }
  
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
    if (apiHost && currentUser && !currentUserError) {
      router.push('/hallway')
    }
  }, [currentUser, currentUserError])

  return (
    <>
      <SEO />
      <Theme>
        <EntiresLayout>
          <StyledInnerWrapper>
            {!config.metabaseApiHost && (
              <>
                <StyledUrlInput
                  autoFocus
                  type='url'
                  placeholder='your Metabase API host'
                  required
                  onChange={_onChangeMetabaseHost}
                />
                <br />
                <br />
                -
                <br />
                <br />
              </>
            )}
            <LoginForm disabled={!getMetabaseApiHost()} />
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
const StyledUrlInput = styled(Input)`
  width: 400px;
  max-width: 100%;
`

export default IndexPage
