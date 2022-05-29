import { makeAutoObservable } from 'mobx'
import { DrawType, DrawProps } from '../../draw'
import mockDrawData from './mockDrawData.json'

class Editor {
  constructor() {
    makeAutoObservable(this)
  }
  edit: DrawProps | null = null
  currEdit: DrawProps | null = null
  panelData = mockDrawData as DrawProps[]

  set editId(id: string) {
    if (id === '') {
      this.currEdit = this.edit = null
      return
    }
    this.edit = this.panelData.find((d) => d.id === id)!
    this.currEdit = { ...this.edit }
  }
  get editType(): DrawType | null {
    if (this.edit) {
      return this.edit.type
    }
    return null
  }
  setPanelData(v : DrawProps[]) {
    this.panelData = v
  }
  deleteEdit() {
    if (this.edit && this.currEdit) {
      const idx = this.panelData.findIndex((d) => d.id === this.currEdit!.id)
      this.panelData.splice(idx, 1)
      this.editId = ''
    }
  }
  updateEdit() {
    if (this.edit && this.currEdit) {
      for (const k of Object.keys(this.currEdit) as (keyof DrawProps)[]) {
        this.edit[k] = this.currEdit[k] as any
      }
    }
  }
}

export default Editor
