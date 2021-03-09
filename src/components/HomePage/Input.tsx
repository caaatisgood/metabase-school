import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Input = forwardRef(
  (
    {
      type,
      placeholder,
      value,
      autoFocus,
      required,
      onChange,
    }: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <StyledInput
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        onChange={onChange}
      />
    )
  },
)

const StyledInput = styled.input`
  outline: none;
  background: transparent;
  border: none;
  text-decoration: underline;
  padding: 0;
  transition: transform 0.15s;
  transform: scale(1);
  transform-origin: center left;
  :focus {
    transform: scale(1.5);
  }
`

export default Input
