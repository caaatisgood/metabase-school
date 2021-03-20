import React, { useRef } from 'react'
import styled from 'styled-components'
import { login } from '../apis/auth'
import Input from './Input'

interface Props {
  disabled: boolean
  onLogin?: Function
}

const LoginForm: React.FC<Props> = ({ disabled, onLogin }) => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const _onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const username = usernameRef?.current?.value || ''
    const password = passwordRef?.current?.value || ''
    login({ username, password })
    if (onLogin) {
      onLogin()
    }
  }

  return (
    <StyledForm onSubmit={_onSubmit}>
      <Input
        ref={usernameRef}
        autoFocus
        type='email'
        placeholder='username / email'
        disabled={disabled}
        required
      />
      <Input
        ref={passwordRef}
        type='password'
        placeholder='password'
        disabled={disabled}
        required
      />
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
