import getFirebaseRef from './getFirebaseRef'

const FB_CLASSROOM_PATH = `classrooms`

export const create = async (randomKey) => {
  console.log(getFirebaseRef(`${FB_CLASSROOM_PATH}/${randomKey}`))
}
