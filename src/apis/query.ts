import { Database } from '../types/metabase'
import fetch from '../libs/fetch'


type QueryDatasetParams = {
  database: number
  query: string
}

export const queryDataset = async ({ database, query }: QueryDatasetParams) => {
  try {
    const res = await fetch(`/.netlify/functions/queryDataset/node-fetch`, {
      method: 'POST',
      body: {
        database,
        native: {
          query,
        },
        type: 'native',
      },
    })
    const payload = await res.json()
    if (!res.ok) {
      window.alert(JSON.stringify(payload.errors))
      return
    }
    return payload
  } catch (err) {
    window.alert(err)
  }
}

export const fetchDatabases = async () => {
  let payload: Database[] = []
  try {
    const res = await fetch(`/.netlify/functions/fetchDatabases/node-fetch`, {
      method: 'GET',
    })
    payload = await res.json()
    if (!res.ok) {
      window.alert(JSON.stringify(payload.errors))
    }
    return payload
  } catch (err) {
    window.alert(err)
  }
  return payload || []
}
