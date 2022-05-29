import { createContext, FC, PropsWithChildren, useContext } from 'react'
import Editor from '.'

const EditorContext = createContext<Editor | null>(null)

const useEditorContext = () => useContext(EditorContext)!
const EditorProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <EditorContext.Provider value={new Editor()}>{children}</EditorContext.Provider>
}

export { EditorProvider, useEditorContext }
