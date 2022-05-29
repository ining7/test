import { observer } from 'mobx-react-lite'
import { drawEditTip } from '@/draw'
import { useEditorContext } from '@/store/Editor/context'
import './style.css'
import { runInAction } from 'mobx'
import { Button, Input, Space } from 'antd'

const RightPanel = observer(() => {
  const editor = useEditorContext()
  const { edit, currEdit, editType } = editor
  console.log(`当前选择${editType}类型组件: `, { ...currEdit })
  const generateRightPanel = () => {
    // 类型守护将 edit/currEdit 剔除 null 类型
    if (edit === null || currEdit === null) {
      return <div>未选中元素</div>
    } else {
      const editTip = drawEditTip[editType!]
      const inputs = (Object.keys(editTip) as (keyof typeof editTip)[]).map((k) => (
        <Space key={k} align="center" className="between">
          {editTip[k]}
          <Input
            value={currEdit[k]}
            onChange={(e) => runInAction(() => (currEdit[k] = e.target.value))}
          />
        </Space>
      ))
      return <div>{inputs}</div>
    }
  }

  return (
    <Space direction="vertical" className="right-panel">
      {generateRightPanel()}
      <Space size="middle">
        {edit && <Button onClick={() => editor.updateEdit()}>确定</Button>}
        {edit && <Button onClick={() => editor.deleteEdit()}>删除</Button>}
      </Space>
    </Space>
  )
})

export default RightPanel
