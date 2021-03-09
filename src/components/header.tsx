import React from 'react'
import styled from 'styled-components'

type Props = {
  siteTitle?: string
}

const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  return (
    <StyledHeader>
      <div className='inner'>
        <h1 style={{ margin: 0 }}>{siteTitle}</h1>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  padding: 0.75rem 1rem;
  .inner {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #5b5c5b;
  }
  color: #5b5c5b;
  h1 {
    font-size: 2rem;
    line-height: 1;
  }
`

export default Header
