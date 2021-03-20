import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Input from '../components/Input'
import Label from '../components/Input/Label'
import ErrorText from '../components/Input/ErrorText'
import useIdentity from '../hooks/useIdentity'
import useJoinClassroom from '../hooks/useJoinClassroom'

const JoinClassroom: React.FC = () => {
  const router = useRouter()
  const { username } = useIdentity()
  const classroomNumRef = useRef<HTMLInputElement>(null)
  const { join, error: joinError, randomKey: joinedRandomKey } = useJoinClassroom()

  const _joinClassroom = (evt: React.FormEvent) => {
    evt.preventDefault()
    join(classroomNumRef?.current?.value as string)
  }

  useEffect(() => {
    if (joinedRandomKey) {
      router.push(`/c/${joinedRandomKey}/${username}`)
    }
  }, [joinedRandomKey])

  return (
    <form onSubmit={_joinClassroom}>
      <Label>
        <span>Join a classroom</span>
        <br />
        <Input
          ref={classroomNumRef}
          autoFocus
          type='text'
          placeholder='classroom number'
          required
        />
      </Label>
      <ErrorText>{joinError?.message}&nbsp;</ErrorText>
    </form>
  )
}

export default JoinClassroom
