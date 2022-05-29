import { FC } from 'react'
import { useDrag } from 'react-dnd'
import useEditorAction from '../../store/Editor/action'
import { DrawType } from '../types'
import './style.css'

type TextProps = {
  id: string
  type: DrawType.TEXT
  data: string
  fontSize: string
  color: string
  width: string
  height: string
  left: string
  top: string
}

const TextShow: FC = () => {
  const [, drag] = useDrag(() => ({
    type: DrawType.TEXT,
  }))

  return (
    <div className="text-component" ref={drag}>
      文字组件
    </div>
  )
}

type buildArg = {
  id: string
  x: string
  y: string
}
const textBuildProps: (arg: buildArg) => TextProps = ({ id, x, y }) => {
  return {
    id,
    type: DrawType.TEXT as const,
    data: '我是新建的文字',
    color: '#000000',
    fontSize: '12px',
    width: '100px',
    height: '20px',
    left: x,
    top: y,
  }
}

const TextDraw: FC<TextProps> = (props) => {
  const { changeEditId } = useEditorAction()
  const { id, data, ...styles } = props
  return (
    <div
      onClick={() => changeEditId(id)}
      style={{
        position: 'absolute',
        backgroundColor: '#bbbbbb',
        ...styles,
      }}
    >
      {data}
    </div>
  )
}

export { TextShow, TextDraw, textBuildProps }
export type { TextProps }
