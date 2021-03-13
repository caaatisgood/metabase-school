import { useState } from 'react'
import getFirebaseRef from '../libs/getFirebaseRef'
import { CLASSROOM_PATH } from '../constants/firebasePaths'

const useJoinClassroom = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [randomKey, setRandomKey] = useState<string | undefined>(undefined)

  const _clearError = () => setError(undefined)

  const join = async (randomKey: string) => {
    _clearError()
    const classroomRef = getFirebaseRef(`${CLASSROOM_PATH}/${randomKey}`)
    const value = (await classroomRef.once('value')).val()
    if (!value) {
      setError(new Error('Classroom not exists, please create one instead.'))
      return
    }
    setRandomKey(randomKey)
  }

  return {
    join,
    error,
    randomKey,
  }
}

export default useJoinClassroom
