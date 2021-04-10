import { useState } from 'react'
import getFirebaseRef from '../utils/getFirebaseRef'
import { getClassroomPath } from '../utils/getClassroomFirebasePath'
import isApiHostPreconfigured from '../utils/isApiHostPreconfigured'
import useMetabaseApiHost from '../hooks/useMetabaseApiHost'
import { FBClassroom } from '../types/firebase'

const useJoinClassroom = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [randomKey, setRandomKey] = useState<string | undefined>(undefined)
  const { apiHost } = useMetabaseApiHost()

  const _clearError = () => setError(undefined)

  const join = async (randomKey: string) => {
    _clearError()
    const classroomRef = getFirebaseRef(getClassroomPath({ randomKey }))
    const value: FBClassroom = (await classroomRef.once('value')).val()
    if (!value) {
      setError(new Error('Classroom not exists, please create one instead.'))
      return
    }
    if (!isApiHostPreconfigured() && value.apiHost !== apiHost) {
      setError(new Error('Incorrect API host.'))
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
