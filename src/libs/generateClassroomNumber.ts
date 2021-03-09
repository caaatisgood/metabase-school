const generateClassroomNumber = () => {
  const d = new Date()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const date = `${d.getDate()}`.padStart(2, '0')
  const year = `${d.getFullYear()}`.substring(2)
  const rand = Math.random().toString(36).substring(3, 6)
  return `${month}${date}${year}-${rand}`
}

export default generateClassroomNumber
