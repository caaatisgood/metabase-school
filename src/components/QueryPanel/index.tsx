import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { queryDataset } from '../../apis/query'
import Result from './Result'
import Editor from './Editor'
import { useRouter } from 'next/router'
import { getQueryPath } from '../../libs/getClassroomFirebasePath'
import useDatabases from '../../hooks/useDatabases'

const QueryPanel: React.FC = () => {
  const router = useRouter()
  const username = router.query.username as string
  const randomKey = router.query.randomKey as string
  const { databases } = useDatabases()
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

  const _onChange = (value: string) => {
    setCode(value)
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
          {!!window.Firepad && editorVisible && (
            <Editor
              firebasePath={getQueryPath({ randomKey, username })}
              onChange={_onChange}
            />
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

export default QueryPanel
