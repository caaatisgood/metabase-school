import { useState } from 'react'
import getFirebaseRef from '../libs/getFirebaseRef'

const FB_CLASSROOM_PATH = `classrooms`

const useCreateClassroom = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [randomKey, setRandomKey] = useState<string | undefined>(undefined)

  const _clearError = () => setError(undefined)

  const create = async (randomKey: string) => {
    _clearError()
    const classroomRef = getFirebaseRef(`${FB_CLASSROOM_PATH}/${randomKey}`)
    const value = (await classroomRef.once('value')).val()
    if (value) {
      setError(new Error('Classroom already exists'))
      return
    }
    classroomRef.set({
      __placeholder: '__placeholder'
    })
    setRandomKey(randomKey)
  }

  return {
    create,
    error,
    randomKey,
  }
}

export default useCreateClassroom
