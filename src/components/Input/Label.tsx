import styled from 'styled-components'

const StyledLabel = styled.label`
  display: block;
  span {
    ${({ theme }) => theme.smallText}
  }
`

export default StyledLabel
