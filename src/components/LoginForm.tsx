import React, { useRef } from 'react'
import styled from 'styled-components'
import { login } from '../apis/auth'
import Input from './HomePage/Input'

const LoginForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const username = usernameRef?.current?.value || ''
    const password = passwordRef?.current?.value || ''
    login({ username, password })
  }

  return (
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
  )
}

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

export default LoginForm
