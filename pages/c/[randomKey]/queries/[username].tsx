import React from 'react'
import QueryBoards from '../../../../src/components/QueryBoards'

export default () => {
  if (typeof window === undefined) {
    return null
  }

  return <QueryBoards />
}
