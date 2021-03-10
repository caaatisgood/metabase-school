import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import SEO from '../src/components/seo'
import Theme from '../src/components/Theme'
import EntiresLayout from '../src/components/EntriesLayout'
import Input from '../src/components/HomePage/Input'
import generateClassroomNumber from '../src/libs/generateClassroomNumber'
import useUser from '../src/hooks/useUser'
import useCreateClassroom from '../src/hooks/useCreateClassroom'
// import { create } from '../src/libs/classroom'

const Hallway = () => {
  const classroomNumRef = useRef<HTMLInputElement>(null)
  const [newClassroomNum, setNewClassroomNum] = useState(generateClassroomNumber())
  const { create, error, randomKey } = useCreateClassroom()

  const { username } = useUser()

  const _joinClassroom = () => {}

  const _createClassroom = (evt: React.FormEvent) => {
    evt.preventDefault()
    create(newClassroomNum)
  }

  const _onNewClassRoomNumChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewClassroomNum(evt.target.value)
  }

  useEffect(() => {
    if (randomKey) {
      Router.push(`/classrooms/${randomKey}/queries/${username}`)
    }
  }, [randomKey])

  return (
    <>
      <SEO title='Hallway' />
      <Theme>
        <EntiresLayout title='Hallway'>
          <form onSubmit={_joinClassroom}>
            <StyledLabel>
              <span>Join a classroom</span>
              <br />
              <Input
                ref={classroomNumRef}
                autoFocus
                type='text'
                placeholder='classroom number'
                required
              />
            </StyledLabel>
          </form>
          <StyledDivider>or</StyledDivider>
          <form onSubmit={_createClassroom}>
            <StyledLabel>
              <span>Create a classroom</span>
              <br />
              <Input
                type='text'
                value={newClassroomNum}
                onChange={_onNewClassRoomNumChange}
                placeholder='classroom number'
                required
              />
            </StyledLabel>
            <StyledError>
              {error?.message}&nbsp;
            </StyledError>
          </form>
        </EntiresLayout>
      </Theme>
    </>
  )
}

const StyledLabel = styled.label`
  display: block;
  span {
    ${({ theme }) => theme.smallText}
  }
`
const StyledDivider = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`
const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.error};

`

export default Hallway
