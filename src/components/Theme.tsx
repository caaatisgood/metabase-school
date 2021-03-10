import React from 'react'
import { css } from 'styled-components'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#5b5c5b',
    background: '#ebebeb',
    error: '#e63946',
  },
  smallText: css`
    font-size: 0.8rem;
  `,
}

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
