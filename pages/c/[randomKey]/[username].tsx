import React from 'react'
import Classroom from '../../../src/components/Classroom'

const Page = () => {
  if (typeof window === undefined) {
    return null
  }

  return <Classroom />
}

export default Page
