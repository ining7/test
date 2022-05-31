import './style.css'
import DrawPanel from '../DrawPanel'
import LeftPanel from '../LeftPanel'
import RightPanel from '../RightPanel'
import { EditorProvider } from '../../store/Editor/context'

export default function App() {
  return (
    <EditorProvider>
      <div className="app">
        <LeftPanel></LeftPanel>
        <DrawPanel></DrawPanel>
        <RightPanel></RightPanel>
      </div>
    </EditorProvider>
  )
}
