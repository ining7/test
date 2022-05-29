import { action } from 'mobx'
import { useCallback } from 'react'
import { useEditorContext } from './context'

const useEditorAction = () => {
  const editor = useEditorContext()
  const changeEditId = useCallback(
    action((id: string) => {
      editor.editId = id
    }),
    [],
  )
  return { changeEditId }
}

export default useEditorAction
