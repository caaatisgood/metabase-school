import { useObjectVal,  } from 'react-firebase-hooks/database'
import { getPeersPath } from '../libs/getClassroomFirebasePath'
import getFirebaseRef from '../libs/getFirebaseRef'
import { Users } from '../types/user'

const useClassroomPeers = ({ randomKey }: { randomKey: string }): Users => {
  const result = useObjectVal(getFirebaseRef(getPeersPath({ randomKey })))
  return result[0] as Users
}

export default useClassroomPeers
