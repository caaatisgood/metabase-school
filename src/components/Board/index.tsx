import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import { queryDataset } from '../../apis/query'
import Result from './Result'
import Editor from './Editor'

// const LazyEditor = React.lazy(() => import('./Editor'), () => '...')

type Databases = {
  name: string
  id: string
}
interface Props extends RouteComponentProps {
  username?: string
  databases: Databases[]
}

const Board: React.FC<Props> = ({ username, databases }) => {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [database, setDatabase] = useState('placeholder')
  const [editorVisible, setEditorVisibility] = useState(true)
  const [querying, setQuerying] = useState(false)

  useEffect(() => {
    if (username) {
      setEditorVisibility(false)
      setCode('')
      setColumns([])
      setRows([])
      setError('')
      setTimeout(() => {
        setEditorVisibility(true)
      }, 200)
    }
  }, [username])

  const _selectDatabase = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setDatabase(evt.target.value)
  }

  const _onQuery = async () => {
    setQuerying(true)
    setError('')
    setColumns([])
    setRows([])
    const result = await queryDataset({
      database: Number(database),
      query: code.replace(/\n/g, '\t'),
    })
    setQuerying(false)
    if (!result || result.status === 'failed') {
      setError(result ? result.error : 'failed')
      return
    }
    setColumns(result.data.columns)
    setRows(result.data.rows)
  }

  return (
    <StyledWrapper>
      <div className='inner'>
        <div style={{ marginBottom: '0.5rem' }}>
          <select onChange={_selectDatabase} value={database}>
            <option value='placeholder' disabled>
              select database
            </option>
            {databases.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='editor-wrapper'>
          {/* <React.Suspense fallback={'preparing editor...'}>
            <LazyEditor username={username} value={code} onChange={setCode} />
          </React.Suspense> */}
          {!!window.Firepad && editorVisible && (
            <Editor username={username} value={code} onChange={setCode} />
          )}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            className='query-btn'
            onClick={_onQuery}
            disabled={querying || database === 'placeholder'}
          >
            {querying ? 'Querying' : 'Query'}
          </button>
        </div>
        <div className='result'>
          {error ? error : <Result columns={columns} rows={rows} />}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding-right: 1rem;
  .inner {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #5b5c5b;
  }
  .editor-wrapper {
    height: 35vh;
  }
  .query-btn {
    background: none;
    cursor: pointer;
    border: 1px solid #5b5c5b;
    border-radius: 5px;
    :hover {
      background: #dbdbdb;
    }
  }
  .result {
    height: 40vh;
  }
`

export default Board
