import {runInAction} from 'mobx'
import {observer} from 'mobx-react-lite'
import {useDrop} from 'react-dnd'
import {DrawProps, DrawType} from '@/draw'
import {textBuildProps, TextDraw} from '@/draw/Text'
import {useEditorContext} from '@/store/Editor/context'
import './style.css'
import {videoBuildProps, VideoDraw} from '@/draw/Video'

const DrawPanel = observer(() => {
  const editor = useEditorContext()
  const { panelData } = editor
  const [, drop] = useDrop(() => ({
    accept: [DrawType.TEXT, DrawType.VIDEO],
    drop: (_, monitor) => {
      const { x, y } = monitor.getClientOffset()!
      const currentX = x - 310
      const currentY = y - 20
      const type = monitor.getItemType()! as DrawType
      const id = `${type}-${panelData.length + 1}`
      const item: DrawProps = (() => {
        switch (type) {
          case DrawType.TEXT:
            return textBuildProps({ id, x: `${currentX}px`, y: `${currentY}px` })
          case DrawType.VIDEO:
            return videoBuildProps({id, x: `${currentX}px`, y: `${currentY}px`})
        }
      })()!
      runInAction(() => {
        panelData.push(item)
      })
    },
  }))

  const generateContent = () => {
    const output = []

    for (const item of panelData) {
      if (item.type === DrawType.TEXT) {
        output.push(<TextDraw key={item.id} {...item}></TextDraw>)
      } else if (item.type === DrawType.VIDEO) {
        output.push(<VideoDraw key={item.id} {...item}></VideoDraw>)
      }
    }

    return output
  }

  return (
    <div className="draw-panel" ref={drop}>
      {generateContent()}
    </div>
  )
})

export default DrawPanel
