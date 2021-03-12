export const getUsersPath = ({ randomKey }: { randomKey: string }) => {
  return `classrooms/${randomKey}/users`
}

type GetQueryPath = {
  username: string,
  randomKey: string,
}
export const getQueryPath = ({ username, randomKey }: GetQueryPath) => {
  return `classrooms/${randomKey}/queries/${username}`
}
