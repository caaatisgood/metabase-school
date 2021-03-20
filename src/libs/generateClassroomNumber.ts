const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const _getRandomChar = () => {
  return chars[~~(Math.random() * chars.length)]
}

const generateClassroomNumber = () => {
  const d = new Date()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const date = `${d.getDate()}`.padStart(2, '0')
  const randomString = Array.from({ length: 3 }).reduce((str) => {
    return `${str}${_getRandomChar()}`
  }, '')
  return `${month}${date}${randomString}`
}

export default generateClassroomNumber
