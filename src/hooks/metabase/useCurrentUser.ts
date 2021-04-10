import useSWR from 'swr'
import fetcher from '../../utils/swrFetcher'

const useCurrentUser = (shouldFetch: boolean = true) => {
  return useSWR(
    shouldFetch ? `/.netlify/functions/fetchCurrentUser/node-fetch` : null,
    fetcher,
  )
}

export default useCurrentUser
