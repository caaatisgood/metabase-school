import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Input from '../components/Input'
import Label from '../components/Input/Label'
import ErrorText from '../components/Input/ErrorText'
import generateClassroomNumber from '../utils/generateClassroomNumber'
import useIdentity from '../hooks/useIdentity'
import useCreateClassroom from '../hooks/useCreateClassroom'

const CreateClassroom: React.FC = () => {
  const router = useRouter()
  const { username } = useIdentity()
  const [newClassroomNum, setNewClassroomNum] = useState(generateClassroomNumber())
  const { create, error: createError, randomKey } = useCreateClassroom()

  const _onNewClassRoomNumberChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewClassroomNum(evt.target.value)
  }

  const _createClassroom = (evt: React.FormEvent) => {
    evt.preventDefault()
    create(newClassroomNum)
  }

  useEffect(() => {
    if (randomKey) {
      router.push(`/c/${randomKey}/${username}`)
    }
  }, [randomKey])

  return (
    <form onSubmit={_createClassroom}>
      <Label>
        <span>Create a classroom</span>
        <br />
        <Input
          type='text'
          value={newClassroomNum}
          onChange={_onNewClassRoomNumberChange}
          placeholder='classroom number'
          required
        />
      </Label>
      <ErrorText>{createError?.message}&nbsp;</ErrorText>
    </form>
  )
}

export default CreateClassroom
