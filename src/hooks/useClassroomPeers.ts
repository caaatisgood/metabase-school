import { useObjectVal } from 'react-firebase-hooks/database'
import { getPeersPath } from '../utils/getClassroomFirebasePath'
import getFirebaseRef from '../utils/getFirebaseRef'
import { Users } from '../types/user'

const useClassroomPeers = ({ randomKey }: { randomKey: string }): Users => {
  const result = useObjectVal(getFirebaseRef(getPeersPath({ randomKey })))
  return result[0] as Users
}

export default useClassroomPeers
