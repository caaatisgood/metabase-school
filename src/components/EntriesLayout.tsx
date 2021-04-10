import React from 'react'
import styled, { css } from 'styled-components'
import siteMetadata from '../constants/siteMetadata'
import useIdentity from '../hooks/useIdentity'
import Button from './Button'
import getImage from '../utils/getImage'

interface Props {
  title?: string
}

const EntiresLayout: React.FC<Props> = ({ title, children }) => {
  const { sessionId, logout } = useIdentity()
  return (
    <StyledWrapper>
      <StyledTitleWrapper hasSubtitle={!!title}>
        {title ? (
          <>
            <h1>{title}</h1>
            <h2>{siteMetadata.title}</h2>
          </>
        ) : (
          <h1>{siteMetadata.title}</h1>
        )}
        {sessionId && (
          <Button size='small' onClick={logout}>
            Logout
          </Button>
        )}
      </StyledTitleWrapper>
      <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
      <a
        href={siteMetadata.githubUrl}
        target='_blank'
        title='GitHub repository of Metabase School'
      >
        <img src={getImage('/github-mark-64px.png')} />
      </a>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-family: Quantico, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  > a {
    opacity: 0.7;
    transition: opacity 0.2s;
    :hover {
      opacity: 1;
    }
  }
  img {
    position: absolute;
    right: 0.75em;
    top: 0.75em;
    height: 1.25em;
    width: auto;
  }
`

interface TitleWrapperProps {
  readonly hasSubtitle: boolean
}
const StyledTitleWrapper = styled.div<TitleWrapperProps>`
  flex: 1;
  text-align: right;
  margin-right: 2.5rem;
  h1 {
    font-size: 6rem;
    word-spacing: 100vw;
  }
  ${({ hasSubtitle }) =>
    hasSubtitle &&
    css`
      h1 {
        word-spacing: initial;
        font-size: 5rem;
      }
    `};
`
const StyledChildrenWrapper = styled.div`
  flex: 1;
`

export default EntiresLayout
