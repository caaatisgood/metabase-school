import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { queryDataset } from '../../apis/query'
import Result from './Result'
import Editor from './Editor'
import { useRouter } from 'next/router'
import { getQueryPath } from '../../utils/getClassroomFirebasePath'
import useDatabases from '../../hooks/metabase/useDatabases'
import Button from '../Button'

const DATABASE_PLACEHOLDER = 'placeholder'

const QueryPanel: React.FC = () => {
  const router = useRouter()
  const username = router.query.username as string
  const randomKey = router.query.randomKey as string
  const { databases } = useDatabases()
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [code, setCode] = useState({ value: '' })
  const [database, setDatabase] = useState({ value: DATABASE_PLACEHOLDER })
  const rerender = useState({})[1]
  const [editorVisible, setEditorVisibility] = useState(true)
  const [querying, setQuerying] = useState(false)

  useEffect(() => {
    if (username) {
      setEditorVisibility(false)
      setCode({ value: '' })
      setColumns([])
      setRows([])
      setError('')
      setTimeout(() => {
        setEditorVisibility(true)
      }, 0)
    }
  }, [username])

  const _selectDatabase = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    // To avoid bumping into stale closure problem when using `onKeyDown` callback
    // (monaco), used to support "query by hitting command + enter". We need to
    // prevent the object `database` reference from being changed when we update
    // them.
    database.value = evt.target.value
    setDatabase(database)
    // Manually rerenders to reflect the update on UI.
    rerender({})
  }

  const _onChange = (value?: string) => {
    // Same "prevent reference from being changed on update" approach to avoid
    // stale closure problem.
    code.value = value || ''
    setCode(code)
  }

  const _onAttemptToQuery = () => {
    if (!code.value || !database.value || database.value === DATABASE_PLACEHOLDER) {
      return
    }
    _query()
  }

  const _query = async () => {
    setQuerying(true)
    setError('')
    setColumns([])
    setRows([])
    const result = await queryDataset({
      database: Number(database.value),
      query: code.value,
    })
    setQuerying(false)
    if (!result || result.status === 'failed') {
      setError(result ? result.error : 'failed')
      return
    }
    setColumns(result.data.columns)
    setRows(result.data.rows)
  }

  const ableToQuery = !querying && database.value !== DATABASE_PLACEHOLDER

  return (
    <StyledWrapper>
      <div className='inner'>
        <div style={{ marginBottom: '0.5rem' }}>
          <select onChange={_selectDatabase} value={database.value}>
            <option value={DATABASE_PLACEHOLDER} disabled>
              select database
            </option>
            {databases.map(({ name, id }) => (
              <option key={id} value={id}>
                {name.replace(/(?<!^).(?!$)/g, '*')}
              </option>
            ))}
          </select>
        </div>
        <div className='editor-wrapper'>
          {/* @ts-ignore */}
          {!!window.Firepad && editorVisible && (
            <Editor
              firebasePath={getQueryPath({ randomKey, username })}
              onChange={_onChange}
              onCmdEnter={_onAttemptToQuery}
            />
          )}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <Button
            className='query-btn'
            onClick={_onAttemptToQuery}
            disabled={!ableToQuery}
          >
            {querying ? 'Querying' : 'Query'}
          </Button>
          &nbsp;
          {ableToQuery && <small>⌘ + Enter</small>}
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
