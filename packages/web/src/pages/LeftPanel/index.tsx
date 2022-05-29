import { Button } from 'antd'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { TextShow } from '../../draw/Text'
import { useEditorContext } from '../../store/Editor/context'
import './style.css'
import {VideoShow} from "@/draw/Video";

const LeftPanel = observer(() => {
  const { panelData } = useEditorContext()

  return (
    <div className="left-panel">
      <div className="component-list">
        <TextShow />
          <VideoShow />
      </div>
      <Button
        className="save-button"
        onClick={async () => {
          console.log('save:', panelData)
          try {
            const res = await axios.post('http://10.3.16.45:8081/api/save', {
              drawPanelData: panelData,
            })
            console.log('res:', res)
          } catch (e) {
            console.log('err:', e)
          }
        }}
      >
        保存到后台
      </Button>
    </div>
  )
})

export default LeftPanel
