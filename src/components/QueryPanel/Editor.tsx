import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import firebase from 'firebase/app'
import styled from 'styled-components'
import getFirebaseRef from '../../utils/getFirebaseRef'
import * as monacoEditorTypes from '../../types/monacoEditor'

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false })

const OPTIONS = {
  tabSize: 2,
}

interface Props {
  firebasePath: string
  onChange: monacoEditorTypes.OnChange
  onCmdEnter?: Function
}

const Editor: React.FC<Props> = ({ firebasePath, onChange, onCmdEnter }) => {
  let _editor: monacoEditorTypes.MonacoEditor
  let _firebaseRef: firebase.database.Reference
  // @ts-ignore
  let _firepad

  useEffect(() => {
    return () => {
      // @ts-ignore
      _firepad?.dispose()
      _firebaseRef?.off()
    }
  }, [])

  const _editorOnMount = (editor: monacoEditorTypes.MonacoEditor) => {
    _editor = editor
    _editor.onKeyDown((evt) => {
      const { metaKey, ctrlKey, code } = evt
      if ((metaKey || ctrlKey) && code === 'Enter') {
        evt.preventDefault()
        onCmdEnter?.()
      }
    })
    _initFirebaseRef()
    _initFirepad()
  }

  const _initFirepad = () => {
    // @ts-ignore
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
        onMount={_editorOnMount}
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
