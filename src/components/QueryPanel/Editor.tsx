import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import getFirebaseRef from '../../libs/getFirebaseRef'

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false })

const OPTIONS = {
  tabSize: 2,
}

type Props = {
  firebasePath: string
  onChange: Function
}

const Editor: React.FC<Props> = ({ firebasePath, onChange }) => {
  let _editor, _firepad, _firebaseRef

  useEffect(() => {
    return () => {
      _firepad.dispose()
      _firebaseRef.off()
    }
  }, [])

  const _editorDidMount = (editor) => {
    _editor = editor
    _initFirebaseRef()
    _initFirepad()
  }

  const _initFirepad = () => {
    _firepad = window.Firepad.fromMonaco(_firebaseRef, _editor)
  }

  const _initFirebaseRef = () => {
    _firebaseRef = getFirebaseRef(firebasePath)
  }

  return (
    <StyledWrapper>
      <MonacoEditor
        defaultLanguage='sql'
        theme='vs-dark'
        options={OPTIONS}
        onMount={_editorDidMount}
        onChange={onChange}
      />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  height: 100%;
  .firepad {
    height: 100%;
  }
`

export default Editor
