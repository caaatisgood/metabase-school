import React from 'react'
import { useRouter } from 'next/router'
import Link from '../../Link'
import styled from 'styled-components'
import { User } from './types'

type Props = {
  isActive: boolean
  user: User
}

const Tab: React.FC<Props> = ({ isActive, user }) => {
  const router = useRouter()
  return (
    <StyledWrapper isActive={isActive}>
      <Link href={{
        pathname: router.pathname,
        query: {
          randomKey: router.query.randomKey,
          username: user.username,
        }}}>{user.username}</Link>
    </StyledWrapper>
  )
}

interface StyledWrapperProps {
  isActive: boolean
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  margin-bottom: 0.5rem;
  border-radius: 5px;
  ${({ isActive }) =>
    isActive
      ? `
    background: #5b5c5b;
  `
      : `
    color: #5b5c5b;
    border: 1px solid #5b5c5b;
  `}
  a {
    color: ${({ isActive }) => (isActive ? '#ebebeb' : '#5b5c5b')};
    display: block;
    text-decoration: none;
    padding: 0.75rem 1.25rem;
  }
`

export default Tab
