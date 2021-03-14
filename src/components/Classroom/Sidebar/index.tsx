import React from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import { User, Username } from '../../../types/user'

type Users = {
  [key: string]: User
}
type Props = {
  username?: string
  users: Users
}

const Sidebar: React.FC<Props> = ({ username, users }) => {
  const self = users?.[username!]
  const mates = users && Object.entries(users).filter(([key]) => key !== username)

  const _isActive = (username?: Username) => {
    return window.location.pathname.indexOf(username!) > -1
  }

  return (
    <StyledWrapper>
      {!!self && <Tab isActive={_isActive(username)} user={self} />}
      <hr />
      {mates?.map(([key, user]) => (
        <Tab isActive={_isActive(user.username)} key={key} user={user} />
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.aside`
  padding: 0 1rem 0.75rem;
  hr {
    margin: 0.75rem 0;
  }
`

export default Sidebar
