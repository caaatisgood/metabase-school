import styled, { css } from 'styled-components'

interface ButtonProps {
  readonly size?: 'small'
}

const Button = styled.button<ButtonProps>`
  background: none;
  cursor: pointer;
  border: 1px solid #5b5c5b;
  border-radius: 5px;
  :hover {
    background: #dbdbdb;
  }
  ${({ size, theme }) =>
    size === 'small' &&
    css`
      ${theme.smallText}
    `}
`

export default Button
