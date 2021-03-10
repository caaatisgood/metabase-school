import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
// import Firepad from 'firepad'
import getFirebaseRef from '../../libs/getFirebaseRef'

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false })

const OPTIONS = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false,
  tabSize: 2,
}

const FIREBASE_BOARDS_REF = `rooms/200619/boards`

type Props = {
  username: string
  value: string
  onChange: Function
}

const Editor: React.FC<Props> = ({ username, value, onChange }) => {
  let _editor, _firepad, _firebaseRef

  useEffect(() => {
    return () => {
      _firepad.dispose()
      _firebaseRef.off()
    }
  }, [])

  const _editorWillMount = () => {
    const { URL, Blob } = window
    const WORKER_HOST = 'https://unpkg.com/monaco-editor@0.20.0/min'
    const proxy = URL.createObjectURL(
      new Blob(
        [
          `
      self.MonacoEnvironment = {
        baseUrl: '${WORKER_HOST}'
      };
      importScripts('${WORKER_HOST}/vs/base/worker/workerMain.js');
    `,
        ],
        { type: 'text/javascript' },
      ),
    )
    window.MonacoEnvironment = {
      getWorkerUrl: () => proxy,
    }
  }

  const _editorDidMount = (editor) => {
    // _setupMonacoWorker()
    _editor = editor
    _initFirebaseRef()
    _initFirepad()
  }

  const _setupMonacoWorker = () => {
    // @ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (
      _moduleId: string,
      label: string
    ) => {
      if (label === "json")
        return "_next/static/json.worker.js"
      if (label === "css")
        return "_next/static/css.worker.js"
      if (label === "html")
        return "_next/static/html.worker.js"
      if (
        label === "typescript" ||
        label === "javascript"
      )
        return "_next/static/ts.worker.js"
      return "_next/static/editor.worker.js"
    }
  }

  const _initFirepad = () => {
    _firepad = window.Firepad.fromMonaco(_firebaseRef, _editor)
    // _firepad = Firepad.fromMonaco(_firebaseRef, _editor)
  }

  const _initFirebaseRef = () => {
    _firebaseRef = getFirebaseRef(`${FIREBASE_BOARDS_REF}/${username}`)
  }

  return (
    <StyledWrapper>
      <MonacoEditor
        defaultLanguage='sql'
        theme='vs-dark'
        onMount={_editorDidMount}
        onChange={onChange}
        // language='sql'
        // theme='vs-dark'
        // value={value}
        // options={OPTIONS}
        // onChange={onChange}
        // editorWillMount={_editorWillMount}
        // editorDidMount={_editorDidMount}
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
