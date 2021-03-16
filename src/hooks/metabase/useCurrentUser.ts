import useSWR from 'swr'
import fetcher from '../../libs/swrFetcher'

const useCurrentUser = (shouldFetch: boolean) => {
  return useSWR(
    shouldFetch ? `/.netlify/functions/fetchCurrentUser/node-fetch` : null,
    fetcher
  )
}

export default useCurrentUser
