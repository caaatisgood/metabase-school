type GetClassroomPathParams = {
  username: string,
  randomKey: string,
}

export const getUserPath = ({ username, randomKey }: GetClassroomPathParams) => {
  return `classrooms/${randomKey}/users/${username}`
}

export const getQueriesPath = ({ username, randomKey }: GetClassroomPathParams) => {
  return `classrooms/${randomKey}/queries/${username}`
}
