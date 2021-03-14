import React, { useEffect, useRef } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { login } from '../src/apis/auth'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import Input from '../src/components/HomePage/Input'
import useSelf from '../src/hooks/useSelf'

const IndexPage = () => {
  const { username } = useSelf()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const username = usernameRef?.current?.value || ''
    const password = passwordRef?.current?.value || ''
    login({ username, password })
  }

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
            <StyledForm onSubmit={onSubmit}>
              <Input
                ref={usernameRef}
                autoFocus
                type='text'
                placeholder='username / email'
                required
              />
              <Input ref={passwordRef} type='password' placeholder='password' required />
              <input type='submit' />
            </StyledForm>
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
const StyledForm = styled.form`
  input {
    display: block;
  }
  input + input {
    margin-top: 1rem;
  }
  input[type='submit'] {
    display: none;
  }
`

export default IndexPage
