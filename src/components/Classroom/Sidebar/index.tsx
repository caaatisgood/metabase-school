import React from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import { Users, Username } from '../../../types/user'

interface Props {
  className?: string
  username?: string
  users?: Users
}

const Sidebar: React.FC<Props> = ({ className, username, users }) => {
  const self = users?.[username!]
  const peers = users && Object.entries(users).filter(([key]) => key !== username)

  const _isActive = (username?: Username) => {
    return window.location.pathname.indexOf(username!) > -1
  }

  return (
    <StyledWrapper className={className}>
      {!!self && <Tab isActive={_isActive(username)} user={self} />}
      <hr />
      {peers?.map(([key, user]) => (
        <Tab isActive={_isActive(user.username)} key={key} user={user} />
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.aside`
  hr {
    margin: 0.75rem 0;
  }
`

export default Sidebar
