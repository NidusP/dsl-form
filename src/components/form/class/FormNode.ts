import { Map } from 'immutable'
import Form from "./Form"
import { Emitter } from '../../Emitter'
import type { FormDSL, FormProp } from "../form.types"

export default class FormNode extends Emitter {
    private _children: FormNode[]
    private _dsl: FormDSL
    private _form: Form
    private _actived: boolean = true
    constructor(dsl: FormDSL, form: Form, actived?: boolean){
        super()
        this._form = form
        this._dsl = dsl
        this._children = []
        this._actived = (actived == null ? true : actived)
        if(dsl.children) {
            let actived: null|number = null
            if(dsl.active) {
                actived = dsl.active(form)
            }
            this._children = dsl.children.map((child, index) => new FormNode(child, form, actived == null || actived === index))
            // if(this._dsl.path) this.onDataChange(this._dsl.defaultVal)
        }
        if(this._dsl.path) this.onDataChange(this._dsl.defaultVal)

        if(dsl.active) {
            this._form.on('data-change', (_path) => {
                this.active()
            })
        }
    }

    private active(){
        let actived: null|number = null
        if(this._dsl.active) {
            actived = this._dsl.active(this._form)
        }
        this._children.forEach((child, index) => {
            child.setActived(actived == null || actived === index)
            console.log(child.getActived())
        })
    }

    public setActived(actived: boolean){
        this._actived = actived
        this.emit('active-change', actived)
    }

    public getActived(){
        return this._actived
    }
    public onDataChange(val:any){
        // 通知表单变化
        this._form.onDataChange(this._dsl.path!, val)
    }

    public getVal(){
        const path = this._dsl.path
        if(path) {
            return this._form.getValueByPath(path) || this._dsl.defaultVal
        }
    }

    public updated(data: Map<string, any>){
        const path = this._dsl.path
        if(path){
            const oldV = this._form.getValueByPath(path), newV = data.getIn(path)
            // console.log(oldV, newV, 'this._form.getValueByPath(this._dsl.path)')
            if(oldV !== newV) {
                this.emit('data-change', newV)
                this._form.onDataChange(path, newV)
            }
        }
        this._children.forEach(formNode => {
            formNode.updated(data)
        })
    }

    public getType(){
        return this._dsl.type
    }
    public getForm(){
        return this._form
    }
    public getPath(){
        return this._dsl.path?.join(',')
    }

    public getProp(prop: FormProp){
        return this._dsl.props?.[prop]
    }
    
    public getChildren(){
        return this._children
    }

    static fromDSL(dsl: FormDSL, form: Form){
        return new FormNode(dsl, form)
    }
}
