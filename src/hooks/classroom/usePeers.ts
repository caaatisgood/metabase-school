import { useObjectVal } from 'react-firebase-hooks/database'
import { getPeersPath } from '../../libs/getClassroomFirebasePath'
import getFirebaseRef from '../../libs/getFirebaseRef'

const usePeers = ({ randomKey }: { randomKey: string }) => {
  return useObjectVal(getFirebaseRef(getPeersPath({ randomKey })))
}

export default usePeers
