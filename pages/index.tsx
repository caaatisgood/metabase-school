import React, { useEffect } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import LoginForm from '../src/components/LoginForm'
import useSelf from '../src/hooks/useSelf'

const IndexPage = () => {
  const { username } = useSelf()

  useEffect(() => {
    if (username) {
      Router.push('/hallway')
    }
  }, [username])

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
