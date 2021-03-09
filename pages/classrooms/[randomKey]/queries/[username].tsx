import React from 'react'

const LazyQueryBoards = React.lazy(() => import('../../../../src/components/QueryBoards'))

export default () => {
  const isSSR = typeof window === 'undefined'

  if (isSSR) {
    return null
  }

  return (
    <React.Suspense fallback='...'>
      <LazyQueryBoards />
    </React.Suspense>
  )
}
