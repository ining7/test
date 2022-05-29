import {FC, useState} from 'react'
import {useDrag} from 'react-dnd'
import useEditorAction from '../../store/Editor/action'
import {DrawType} from '@/draw'
import './style.css'
import {useEditorContext} from "@/store/Editor/context";

type VideoProps = {
    id: string
    type: DrawType.VIDEO
    width: string
    height: string
    left: string
    top: string
}

const VideoShow: FC = () => {
    const [, drag] = useDrag(() => ({
        type: DrawType.VIDEO,
    }))

    return (
        <div className="video-component" ref={drag}>
            视频组件
        </div>
    )
}


type buildArg = {
    id: string
    x: string
    y: string
}

const videoBuildProps: (arg: buildArg) => VideoProps = ({id, x, y}) => {
    return {
        id,
        type: DrawType.VIDEO as const,
        width: '160px',
        height: '90px',
        left: x,
        top: y,
    }
}

const VideoDraw: FC<VideoProps> = (props) => {
    const editor = useEditorContext()
    const {panelData} = editor
    const [isLogin, setLogin] = useState(false)
    const [url, setUrl] = useState("")
    const {id, ...styles} = props
    const change = (e: any) => {
        setLogin(true)
        setUrl(URL.createObjectURL(e.currentTarget.files[0]))
        panelData.forEach((item, key, panelData) => {
            if (item.id === id) {
                const reader = new FileReader();
                reader.readAsDataURL(e.currentTarget.files[0]);
                reader.onload = function () {
                    editor.setPanelData(panelData)
                }
            }
        })
    }

    const {changeEditId} = useEditorAction()
    return (
        <div
            onClick={() => changeEditId(id)}
            style={{
                position: 'absolute',
                ...styles,
            }}
        >

            {
                isLogin ? <video src={url} style={{...styles}} controls={true} preload={"auto"}/> :
                    <div style={{
                        borderStyle: "solid",
                        borderWidth: "1px",
                        ...styles,
                    }}>
                        <input name='未选择' style={{marginTop: "80px", marginLeft: "20px"}} type="file" accept="video/*"
                               onChange={e => {
                                   change(e)
                               }}>
                        </input>
                    </div>
            }
        </div>
    )
}

export {VideoShow, VideoDraw, videoBuildProps}
export type {VideoProps}
