import React from 'react'
import styled from 'styled-components'

interface Props {
  columns: string[]
  rows: string[][]
}

const Result: React.FC<Props> = ({ columns, rows }) => {
  return (
    <StyledWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((data, dataIndex) => (
                <td key={dataIndex}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  overflow: scroll;
  max-height: 100%;
`
const Table = styled.table`
  font-size: 12px;
  position: relative;
  th {
    position: sticky;
  }
`

export default Result
