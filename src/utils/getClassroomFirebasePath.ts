import { CLASSROOM_PATH } from '../constants/firebasePaths'

export const getClassroomPath = ({ randomKey }: { randomKey: string }) => {
  return `${CLASSROOM_PATH}/${randomKey}`
}

export const getPeersPath = ({ randomKey }: { randomKey: string }) => {
  return `${CLASSROOM_PATH}/${randomKey}/users`
}

type GetPeerPath = {
  username: string
  randomKey: string
}
export const getPeerPath = ({ randomKey, username }: GetPeerPath) => {
  return `${getPeersPath({ randomKey })}/${username}`
}

type GetQueryPath = {
  username: string
  randomKey: string
}
export const getQueryPath = ({ username, randomKey }: GetQueryPath) => {
  return `${CLASSROOM_PATH}/${randomKey}/queries/${username}`
}
