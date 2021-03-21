import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import useIdentity from '../hooks/useIdentity'
import Button from './Button'

interface Props {
  siteTitle?: string
}

const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const { logout } = useIdentity()
  return (
    <StyledWrapper>
      <div className='inner'>
        <h1>{siteTitle}</h1>
        <StyledRight>
          <StyledLink title='logout' href='/hallway'>
            Hallway
          </StyledLink>
          <StyledButton size='small' onClick={logout}>
            Logout
          </StyledButton>
        </StyledRight>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.header`
  padding: 0.75rem 1rem;
  .inner {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #5b5c5b;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  color: #5b5c5b;
  h1 {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
  }
`
const StyledRight = styled.div`
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  color: #5b5c5b;
  :hover {
    opacity: 0.85;
  }
`
const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`

export default Header
