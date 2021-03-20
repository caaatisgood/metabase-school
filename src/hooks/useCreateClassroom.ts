import { useState } from 'react'
import getFirebaseRef from '../libs/getFirebaseRef'
import { getClassroomPath } from '../libs/getClassroomFirebasePath'
import isApiHostPreconfigured from '../libs/isApiHostPreconfigured'
import cleanApiHost from '../libs/cleanApiHost'
import useMetabaseApiHost from '../hooks/useMetabaseApiHost'
import { FBClassroom } from '../types/firebase'

const useCreateClassroom = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [randomKey, setRandomKey] = useState<string | undefined>(undefined)
  const { apiHost, update: setApiHost } = useMetabaseApiHost()

  const _clearError = () => setError(undefined)

  const create = async (randomKey: string) => {
    _clearError()
    const classroomRef = getFirebaseRef(getClassroomPath({ randomKey }))
    const value = (await classroomRef.once('value')).val()
    if (value) {
      setError(new Error('Classroom already exists'))
      return
    }
    const classroomPayload: FBClassroom = {
      __placeholder: '__placeholder',
    }
    if (!isApiHostPreconfigured()) {
      const _apiHost = cleanApiHost(apiHost)
      setApiHost(_apiHost)
      classroomPayload.apiHost = _apiHost
    }
    classroomRef.set(classroomPayload)
    setRandomKey(randomKey)
  }

  return {
    create,
    error,
    randomKey,
  }
}

export default useCreateClassroom
